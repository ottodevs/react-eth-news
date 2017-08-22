import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class PriceTrendChart extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    var chartStyle, loaderStyle;
    if (!this.props.dataProvider.length) {
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
        "title": 'Google Trend Index'
      }, {
        "id":"v2",
        "axisAlpha": 1,
        "position": "left",
        "ignoreAxisWidth": true,
        "title": 'Price (USD)'
      }],
      "valueScrollbar":{
        "oppositeAxis":false,
        "offset":80,
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
        "title": this.props.googleTrendsLabel,
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
        "title": this.props.currencyPairLabel,
        "useLineColorForBulletBorder": true,
        "valueField": this.props.currencyPairValue,
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
    }

    return (
      <div>
        <p style={{fontWeight: '600', fontSize: '16px', margin: '30px 0 0 50px'}}>{this.props.label}</p>
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
