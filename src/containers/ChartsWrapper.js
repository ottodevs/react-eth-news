import './ChartsWrapper.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import * as ethPricesActions from '../store/ethPrices/actions';
import * as ethPricesSelectors from '../store/ethPrices/reducer';
import * as datesActions from '../store/dates/actions';
import * as datesSelectors from '../store/dates/reducer';
import * as articlesSelectors from '../store/articles/reducer';
import AmCharts from '@amcharts/amcharts3-react';
import moment from 'moment';

class ChartsWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchGoogleTrendsOverTime())
    this.props.dispatch(ethPricesActions.fetchEthUsdOverTime())
  }

  componentDidUpdate() {
    const startDate = this.props.startDate ? this.props.startDate : new Date(2015, 7, 3);
    const endDate =  this.props.endDate ? this.props.endDate.toDate() : new Date(Date.now());
    console.log(this.refs.lineChart.state)
    if (this.props.dataProvider.length &&
        (this.props.initBy === 'filter' || this.props.initBy === 'init') && this.refs.lineChart && this.refs.lineChart.state.chart) {

      console.log(this.refs.lineChart.state)
      this.refs.lineChart.state.chart.zoomToDates(this.props.startDate.toDate(), endDate);
    }
  }

  render() {
    var chartStyle, loaderStyle;
    if (!this.props.dataProvider.length && !this.props.articlesByDate.length) {
      chartStyle = {
        opacity: '0',
        height: '0px'
      };
      loaderStyle = {
        opacity: '1',
        height: '320px'
      }
    } else {
      chartStyle = {
        opacity: '1',
        height: '320px'
      };
      loaderStyle = {
        opacity: '0',
        height: '0px'
      }
    }

    const serialConfig = {
      "type": "serial",
      "theme": "light",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "dataDateFormat": "YYYY-MM-DD",
      "legend": {
        "useGraphSettings": true
      },
      "valueAxes": [{
        "id":"v1",
        "axisAlpha": 1,
        "position": "right",
        "ignoreAxisWidth": true
      }, {
        "id":"v2",
        "axisAlpha": 1,
        "position": "left",
        "ignoreAxisWidth": true
      }],
      "valueScrollbar":{
        "oppositeAxis":false,
        "offset":50,
        "scrollbarHeight":10
      },
      "graphs": [{
        "id": "g1",
        "valueAxis": "v1",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "Google trend",
        "useLineColorForBulletBorder": true,
        "valueField": "googleTrends",
        "balloonText": "<span style='font-size:12px;'>[[value]]</span>"
      }, {
        "id": "g2",
        "valueAxis": "v2",
        "bullet": "square",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "ETH/USD",
        "useLineColorForBulletBorder": true,
        "valueField": "ethUsd",
        "balloonText": "<span style='font-size:12px;'>[[value]]</span>"
      }],
      "chartCursor": {
        "pan": true,
        "cursorAlpha": 1,
        "cursorColor": "#258cbb",
        "limitToGraph": "g1",
        "valueLineAlpha": 0.2,
        "valueZoomable": true
      },
       "chartScrollbar": {
        "offset":30,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA",
        "graph": "g1",
        "scrollbarHeight": 40
      },
      "categoryField": "date",
      "categoryAxis": {
        "dashLength": 1,
        "minorGridEnabled": true,
        "parseDates": true
      },
      "export": {
        "enabled": true
      },
      "dataProvider": this.props.dataProvider,
      "listeners": [{
        "event": "rendered",
        "method": e => {
          var self = this;
          if (this.props.initBy === 'filter') {
            self.chartDiv && self.chartDiv.removeEventListener("mouseup", self.handleMouseUp);
            self.sb && self.sb.removeEventListener("mousedown", self.handleMouseDown);
            return
          }
          self.chartDiv = e.chart.chartDiv;
          self.handleMouseDown = () => {
            e.chart.mouseIsDown = true;
          }
          self.handleMouseUp = () => {
            e.chart.mouseIsDown = false;
            const startDate = moment.unix(e.chart.chartScrollbar.startTime / 1000);
            const endDate = moment.unix(e.chart.chartScrollbar.endTime / 1000);
            self.props.dispatch(datesActions.changeDateRange({ startDate, endDate }), 'chart');
            self.chartDiv.removeEventListener("mouseup", self.handleMouseUp);
            self.sb.removeEventListener("mousedown", self.handleMouseDown);
          }

          if (e.chart.chartScrollbar.set) {
            self.sb = e.chart.chartScrollbar.set.node;
            self.sb.addEventListener("mousedown", self.handleMouseDown);
            self.chartDiv.addEventListener("mouseup", self.handleMouseUp);
          }
        }

      }, {
        "event": "zoomed",
        "method": (e) => {
          e.chart.lastZoomed = e;
        }
      }]
    }

    const barConfig = {
     "type": "serial",
     "theme": "light",
     "marginRight": 90,
      "marginLeft": 40,
     "legend": {
       "useGraphSettings": true,
     },
     "dataProvider": this.props.articlesByDate,
     "dataDateFormat": "YYYY-MM",
     "graphs": [{
       "balloonText": "<b>[[title]]</b><br><span style='font-size:12px'>[[category]]: <b>[[value]]</b></span>",
       "fillAlphas": 0.8,
       "labelText": "[[value]]",
       "lineAlpha": 0.3,
       "title": "Mainstream sites mentioning ethereum",
       "type": "column",
       "color": "#000000",
       "valueField": "msm"
     }],
     "categoryField": "date",
     "categoryAxis": {
       "gridPosition": "start",
       "axisAlpha": 0,
       "gridAlpha": 0,
       "position": "left",
       "labelRotation": 45
     },
     "listeners": [{
        "event": "rendered",
        "method": e => {
          if ((e.chart.endIndex || e.chart.endIndex === 0) && this.refs.barChart) {
            this.refs.barChart.state.chart.zoomOut();
          }
        }
      }]
   }

    return (
      <div className="col-md-6 charts-container">
        <div className="google-trends__chart-container" style={chartStyle}>
          <AmCharts.React ref="lineChart" {...serialConfig} />
        </div>
        <div className="loading-wrapper" style={loaderStyle}>
          <div className="loading" ></div>
        </div>
        <div className="mainstream-count__chart-container" style={chartStyle}>
          <AmCharts.React ref="barChart" {...barConfig} />
        </div>
        <div className="loading-wrapper" style={loaderStyle}>
          <div className="loading" ></div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  var googleTrendsOverTime = googleTrendsSelectors.getGoogleTrendsOverTime(state);
  var ethUsdOverTime = ethPricesSelectors.getEthUsdOverTime(state);
  var dataProvider = [];
  var articlesByDate = []
  var dates = datesSelectors.getCurrentDateRange(state);
  if (googleTrendsOverTime && ethUsdOverTime) {
    var dataLength = googleTrendsOverTime.length <= ethUsdOverTime.length ?
      googleTrendsOverTime.length : ethUsdOverTime.length;
    googleTrendsOverTime = googleTrendsOverTime.slice(0, dataLength);
    ethUsdOverTime = ethUsdOverTime.slice(0, dataLength);
    dataProvider = _.merge(googleTrendsOverTime, ethUsdOverTime);
    articlesByDate = articlesSelectors.getArticlesGroupByDate(state);
  }
  return {
    googleTrendsOverTime,
    ethUsdOverTime,
    dataProvider,
    startDate: dates.startDate,
    endDate: dates.endDate,
    initBy: datesSelectors.getDateChangeInitiator(state),
    articlesByDate: articlesByDate
  }
}

export default connect(mapStateToProps)(ChartsWrapper)


