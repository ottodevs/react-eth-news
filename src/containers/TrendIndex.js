import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import pricesActions from '../store/prices/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import * as pricesSelectors from '../store/prices/reducer';
import {
  TrendsChartWrapper,
  BtcPriceTrendChartWrapper,
  EthPriceTrendChartWrapper,
  BchPriceTrendChartWrapper,
  XrpPriceTrendChartWrapper,
  XemPriceTrendChartWrapper,
  LtcPriceTrendChartWrapper
} from './index'
import {PriceTrendChart} from '../components'

class TrendIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="TrendIndex">
        <section className="header-section container">
          <header className="row justify-content-center">
            <h4 className="col-md-12">
              <span>Google trend and price on the same chart for cryptocurrencies</span>
            </h4>
          </header>
        </section>
        <section className="container">
          <div className="row">
            <div className="col-md-12 trend-index__charts-container">
              <TrendsChartWrapper />
              <BtcPriceTrendChartWrapper />
              <EthPriceTrendChartWrapper />
              <BchPriceTrendChartWrapper />
              <XrpPriceTrendChartWrapper />
              <XemPriceTrendChartWrapper />
              <LtcPriceTrendChartWrapper />





              <p style={{fontWeight: '600', fontSize: '16px', margin: '30px 0 0 50px'}}>More To Come</p>
            </div>
          </div>
        </section>
      </div>
    )
  }


}

function getDataProvider(state, priceSelector, googleTrendSelector) {
  var googleTrendsOverTime = googleTrendSelector(state);
  var priceOverTime = priceSelector(state);
  var dataProvider = [];
  if (googleTrendsOverTime && priceOverTime) {
    const googleTrendsIndex = _.keyBy(googleTrendsOverTime, 'date');
    const priceIndex = _.keyBy(priceOverTime, 'date');
    dataProvider = _(priceIndex)
      .pick(_.keys(googleTrendsIndex))
      .merge(_.pick(googleTrendsIndex, _.keys(priceIndex)))
      .values()
      .value()
  }
  return dataProvider;
}


export default TrendIndex
