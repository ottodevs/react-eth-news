import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import * as pricesActions from '../store/prices/actions';
import * as pricesSelectors from '../store/prices/reducer';
import PriceTrendChart from '../components/PriceTrendChart.js'

class TrendIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchEthGoogleTrendsOverTime())
    this.props.dispatch(googleTrendsActions.fetchBtcGoogleTrendsOverTime())
    this.props.dispatch(googleTrendsActions.fetchXrpGoogleTrendsOverTime())
    this.props.dispatch(googleTrendsActions.fetchXemGoogleTrendsOverTime())
    this.props.dispatch(googleTrendsActions.fetchLtcGoogleTrendsOverTime())
    this.props.dispatch(pricesActions.fetchEthUsdOverTime())
    this.props.dispatch(pricesActions.fetchBtcUsdOverTime())
    this.props.dispatch(pricesActions.fetchXrpUsdOverTime())
    this.props.dispatch(pricesActions.fetchXemUsdOverTime())
    this.props.dispatch(pricesActions.fetchLtcUsdOverTime())
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
              <PriceTrendChart
                label={'Ethererum'}
                currencyPairLabel={'ETH/USD'}
                currencyPairValue={'ethUsd'}
                googleTrendsLabel={'Ethererum google trends'}
                dataProvider={this.props.ethDataProvider}
              />
              <PriceTrendChart
                label={'Bitcoin'}
                currencyPairLabel={'BTC/USD'}
                currencyPairValue={'btcUsd'}
                googleTrendsLabel={'Bitcoin google trends'}
                dataProvider={this.props.btcDataProvider}
              />
              <PriceTrendChart
                label={'Ripple'}
                currencyPairLabel={'XRP/USD'}
                currencyPairValue={'xrpUsd'}
                googleTrendsLabel={'Ripple google trends'}
                dataProvider={this.props.xrpDataProvider}
              />
              <PriceTrendChart
                label={'NEM'}
                currencyPairLabel={'XEM/USD'}
                currencyPairValue={'xemUsd'}
                googleTrendsLabel={'NEM google trends'}
                dataProvider={this.props.xemDataProvider}
              />
              <PriceTrendChart
                label={'Litecoin'}
                currencyPairLabel={'LTC/USD'}
                currencyPairValue={'ltcUsd'}
                googleTrendsLabel={'Litecoin google trends'}
                dataProvider={this.props.ltcDataProvider}
              />
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
    var ethDataLength = googleTrendsOverTime.length <= priceOverTime.length ?
      googleTrendsOverTime.length : priceOverTime.length;
    googleTrendsOverTime = googleTrendsOverTime.slice(0, ethDataLength);
    priceOverTime = priceOverTime.slice(0, ethDataLength);
    dataProvider = _.merge(googleTrendsOverTime, priceOverTime);
  }
  return dataProvider;
}

function mapStateToProps(state) {
  const ethDataProvider = getDataProvider(
      state, pricesSelectors.getEthUsdOverTime, googleTrendsSelectors.getEthGoogleTrendsOverTime);
  const btcDataProvider = getDataProvider(
      state, pricesSelectors.getBtcUsdOverTime, googleTrendsSelectors.getBtcGoogleTrendsOverTime);
  const xrpDataProvider = getDataProvider(
      state, pricesSelectors.getXrpUsdOverTime, googleTrendsSelectors.getXrpGoogleTrendsOverTime);
  const xemDataProvider = getDataProvider(
      state, pricesSelectors.getXemUsdOverTime, googleTrendsSelectors.getXemGoogleTrendsOverTime);
  const ltcDataProvider = getDataProvider(
      state, pricesSelectors.getLtcUsdOverTime, googleTrendsSelectors.getLtcGoogleTrendsOverTime);
  return {
    ethDataProvider: ethDataProvider,
    btcDataProvider: btcDataProvider,
    xrpDataProvider: xrpDataProvider,
    xemDataProvider: xemDataProvider,
    ltcDataProvider: ltcDataProvider
  }
}

export default connect(mapStateToProps)(TrendIndex)
