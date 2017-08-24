import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import pricesActions from '../store/prices/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import * as pricesSelectors from '../store/prices/reducer';
import {PriceTrendChart} from '../components';


class BtcPriceTrendChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.btcDataProvider || !this.props.btcDataProvider.length) && nextProps.btcDataProvider.length) return true
    else return false
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchBtcGoogleTrendsOverTime())
    this.props.dispatch(pricesActions.fetchBtcUsdOverTime())
  }

  handleTimeIntervalChange(currency, interval) {
    this.props.dispatch(trendIndexChartsActions.updateChartInterval(currency, interval))
  }

  render() {
    return (

        <div >
          <PriceTrendChart
            label={'Bitcoin'}
            ticker={'btc'}
            currencyPairLabel={'BTC/USD'}
            currencyPairValue={'btcUsd'}
            googleTrendsLabel={'Bitcoin google trends'}
            handleTimeIntervalChange={this.handleTimeIntervalChange}
            dataProvider={this.props.btcDataProvider}
          />
        </div>

    );
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

function mapStateToProps(state) {
  const btcDataProvider = getDataProvider(
      state, pricesSelectors.getBtcUsdOverTime, googleTrendsSelectors.getBtcGoogleTrendsOverTime);
  return {
    btcDataProvider: btcDataProvider,

  }
}

export default connect(mapStateToProps)(BtcPriceTrendChartWrapper)
