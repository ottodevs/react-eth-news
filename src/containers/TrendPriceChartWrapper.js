import React, { Component } from 'react'
import _ from 'lodash'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import googleTrendsPromise from '../store/googleTrends/reducer'
import {
  getGoogleTrendSelectorFromTicker,
  getGoogleTrendFetchingError
} from '../store/googleTrends/reducer'
import {
  fetchUsdPriceDailyFromTicker
} from '../store/prices/actions'
import {
  fetchGoogleTrendsDailyFromTicker
} from '../store/googleTrends/actions'
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions'
import {
  getPriceSelectorFromTicker,
  getPriceFetchingError
} from '../store/prices/reducer'
import { withRouter } from 'react-router'
import { capitalizeFirstLetter } from '../utils'
import { getTokenStats } from '../store/tokenStats/reducer'
import { PriceTrendChart, Social } from '../components'


class TrendPriceChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.dataProvider ||
         !this.props.dataProvider.length) && nextProps.dataProvider.length ||
          nextProps.error ||
          (this.props.dataProvider && nextProps.dataProvider
           && (this.props.dataProvider.length != nextProps.dataProvider.length)))
      return true
    else return false
  }

  componentDidMount() {
    this.props.dispatch(
      fetchGoogleTrendsDailyFromTicker(this.props.match.params.ticker)())
    this.props.dispatch(
      fetchUsdPriceDailyFromTicker(this.props.match.params.ticker)())
  }

  handleTimeIntervalChange(currency, interval) {
    this.props.dispatch(trendIndexChartsActions.updateChartInterval(currency, interval))
  }

  render() {
    return (
        <div className="trend-price__wrapper container" style={{marginTop: '80px', marginBottom: '280px'}}>

          <div className="row">
            <div className="col-md-12">
            {
              this.props.error ?
              <div style={{
                textAlign: 'center',
                height: '320px',
                marginBottom: '50px'
              }}>{ this.props.errorMessage || `Sorry, we currently don't have data on ${this.props.ticker}`}</div> :
              <div>
              <Social title={`Google Trends meet ${this.props.name}`} url={`https://www.cryptocurrent.co${this.props.match.url}`} />
              <PriceTrendChart
                label={this.props.name}
                ticker={this.props.ticker}
                currencyPairLabel={`${this.props.ticker}/USD`}
                currencyPairValue={`${this.props.ticker.toLowerCase()}Usd`}
                googleTrendsLabel={`${this.props.name} google trends`}
                handleTimeIntervalChange={this.handleTimeIntervalChange}
                dataProvider={this.props.dataProvider}
              />
              </div>
            }
            </div>
          </div>
        </div>

    );
  }
}



function getDataProvider(state, priceSelector, googleTrendSelector) {
  var googleTrendsOverTime = _.cloneDeep(googleTrendSelector(state));
  var priceOverTime = _.cloneDeep(priceSelector(state));
  var priceFetchingError = getPriceFetchingError(state);
  var googleTrendFetchingError = getGoogleTrendFetchingError(state)
  var dataProvider = [];
  if (priceFetchingError && googleTrendFetchingError) throw new Error(`We're having trouble loading the data. Please try again later.`)
  else if (priceFetchingError && !googleTrendFetchingError) throw new Error(priceFetchingError)
  else if (!priceFetchingError && googleTrendFetchingError) throw new Error(googleTrendFetchingError)

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

function mapStateToProps(state, ownProps) {

  const ticker = ownProps.match.params.ticker.toLowerCase()

  const googleTrendSelector = getGoogleTrendSelectorFromTicker(ticker.toLowerCase())
  const priceSelector = getPriceSelectorFromTicker(ticker.toLowerCase())
  var dataProvider = [], errorMessage;
  var tokensByTicker = getTokenStats(state)[0];

  try {
    dataProvider = getDataProvider(
      state, priceSelector, googleTrendSelector);
  } catch (error) {
    errorMessage = error.message
  }
  if (!_.isEmpty(tokensByTicker) && !tokensByTicker[ticker.toUpperCase()]) {
    return {
      dataProvider: [],
      error: true,
      name: capitalizeFirstLetter(ticker),
      ticker: ticker.toUpperCase()
    }
  }
  return {
    dataProvider: dataProvider,
    error: errorMessage ? true : false,
    errorMessage,
    name: _.isEmpty(tokensByTicker) ? '' :
    capitalizeFirstLetter(tokensByTicker[ticker.toUpperCase()].name),
    ticker: ticker.toUpperCase()
  }

}



export default withRouter(connect(mapStateToProps)(TrendPriceChartWrapper))

