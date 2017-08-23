import React, { Component } from 'react';
import autoBind from 'react-autobind';
import googleTrendsActions from '../store/googleTrends/actions';

import { getAllGoogleTrendsOverTime } from '../store/googleTrends/reducer';

function createGraph(currency, i) {
  return {
    "id": `g${i}`,
    "valueAxis": "v1",
    "bullet": "round",
    "bulletBorderAlpha": 1,
    "bulletColor": "#FFFFFF",
    "bulletSize": 5,
    "hideBulletsCount": 50,
    "lineThickness": 2,
    "title": currency,
    "useLineColorForBulletBorder": true,
    "valueField": currency,
    "balloonText": "<span style='font-size:12px;'>[[value]]</span>"
  }
}

export default class TrendsChart  extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    var chartStyle, loaderStyle, graphs = [];
    const hidden = {
      opacity: '0',
      height: '0px'
    };
    const shown = {
      opacity: '1',
      height: '320px'
    }

    if (!this.props.dataProvider) {
      chartStyle = hidden;
      loaderStyle = shown;
    } else {
      if (!this.props.dataProvider.length) {
        chartStyle = hidden;
        loaderStyle = shown;
      } else {
        graphs = _.keys(_.omit(this.props.dataProvider[0], ['date']))
        .map(createGraph);
        chartStyle = shown;
        loaderStyle = hidden;
      }
    }

    const config = {
      "type": "serial",
      "theme": "light",
      "marginRight": 70,
      "marginLeft": 70,
      "autoMarginOffset": 20,
      "dataDateFormat": "YYYY-MM-DD",
      "legend": {
        "useGraphSettings": true
      },
      "valueAxes": [{
        "id":"v1",
        "axisAlpha": 1,
        "position": "right",
        "ignoreAxisWidth": true,
        "title": "Google Trend Index"
      }],
      "valueScrollbar":{
        "oppositeAxis":false,
        "offset":80,
        "scrollbarHeight":10
      },
      "graphs": graphs,
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
    }


    return (
      <div>
        <p style={{fontWeight: '600', fontSize: '16px', margin: '30px 0 0 50px'}}>Compare Trends</p>
        <div className="google-trends__chart-container" style={chartStyle}>
          <AmCharts.React ref="chart" {...config} />
        </div>
        <div className="loading-wrapper" style={loaderStyle}>
          <div className="loading" ></div>
        </div>
      </div>
    );
  }

}
