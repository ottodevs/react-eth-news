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
    if (this.props.initBy === 'filter') {
      this.refs.chart.state.chart.zoomToDates(this.props.startDate.toDate(), endDate);
    }
  }

  render() {



    const config = {
      "type": "serial",
      "theme": "light",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": true,
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
        "event": "zoomed",
        "method": () => {
            const startDate = moment.unix(this.refs.chart.state.chart.startTime / 1000);
            const endDate = moment.unix(this.refs.chart.state.chart.endTime / 1000);
            this.props.dispatch(datesActions.changeDateRange({ startDate, endDate }, 'chart'));
        }
      }]
    }

    return (
      <div className="col-md-6 google-trends__chart-container">
        <AmCharts.React ref="chart" {...config} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  var googleTrendsOverTime = googleTrendsSelectors.getGoogleTrendsOverTime(state);
  var ethUsdOverTime = ethPricesSelectors.getEthUsdOverTime(state);
  var dataProvider = [];
  var dates = datesSelectors.getCurrentDateRange(state);
  if (googleTrendsOverTime && ethUsdOverTime) {
    var dataLength = googleTrendsOverTime.length <= ethUsdOverTime.length ?
      googleTrendsOverTime.length : ethUsdOverTime.length;
    googleTrendsOverTime = googleTrendsOverTime.slice(0, dataLength);
    ethUsdOverTime = ethUsdOverTime.slice(0, dataLength);
    dataProvider = _.merge(googleTrendsOverTime, ethUsdOverTime)
  }
  return {
    googleTrendsOverTime,
    ethUsdOverTime,
    dataProvider,
    startDate: dates.startDate,
    endDate: dates.endDate,
    initBy: datesSelectors.getDateChangeInitiator(state),

  }
}

export default connect(mapStateToProps)(ChartsWrapper)


