import './ChartsWrapper.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import AmCharts from '@amcharts/amcharts3-react';

class ChartsWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchGoogleTrendsOverTime())
  }

  render() {
    console.log(this.props.googleTrendsOverTime)

    const config = {
        "type": "serial",
        "theme": "light",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "mouseWheelZoomEnabled": true,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
          "id": "v1",
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth": true
        }],
        "balloon": {
          "borderThickness": 1,
          "shadowAlpha": 0
        },
        "graphs": [{
          "id": "g1",
          "balloon": {
            "drop": true,
            "adjustBorderColor": false,
            "color": "#ffffff"
          },
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "value",
          "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartScrollbar": {
          "graph": "g1",
          "oppositeAxis": false,
          "offset": 30,
          "scrollbarHeight": 80,
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
          "valueLineEnabled": true,
          "valueLineBalloonEnabled": true,
          "cursorAlpha": 1,
          "cursorColor": "#258cbb",
          "limitToGraph": "g1",
          "valueLineAlpha": 0.2,
          "valueZoomable": true
        },
        "valueScrollbar": {
          "oppositeAxis": false,
          "offset": 50,
          "scrollbarHeight": 10
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
        "dataProvider": this.props.googleTrendsOverTime,

    }
    return (
      <div className="container google-trends__chart-container">
        <AmCharts.React {...config} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const googleTrendsOverTime = googleTrendsSelectors.getGoogleTrendsOverTime(state);
  return {
    googleTrendsOverTime
  }
}

export default connect(mapStateToProps)(ChartsWrapper)
