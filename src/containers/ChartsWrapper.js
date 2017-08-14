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
import AmCharts from '@amcharts/amcharts3-react';

class ChartsWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.loadInitialData()
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
        "id":"v2",
        "axisAlpha": 1,
        "position": "left",
        "ignoreAxisWidth": true
      }],
      "graphs": [{
        "id": "g1",
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
      "chartScrollbar": {
        "graph": "g2",
        "oppositeAxis": false,
        "offset": 30,
        "scrollbarHeight": 60,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA"
      },
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
    }

    return (
      <div className="container">
        <div className="row justify-content-center google-trends__chart-container">
          <div className="col-md-8">
            <AmCharts.React {...config} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  var googleTrendsOverTime = googleTrendsSelectors.getGoogleTrendsOverTime(state);
  var ethUsdOverTime = ethPricesSelectors.getEthUsdOverTime(state);
  var dataProvider = [];
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
    dataProvider
  }
}

function mapDispatch(dispatch) {
  return {
    loadInitialData () {
      dispatch(googleTrendsActions.fetchGoogleTrendsOverTime())
      dispatch(ethPricesActions.fetchEthUsdOverTime())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(ChartsWrapper)


