import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import {googleTrendsSelectors} from '../store/googleTrends/reducer';
import pricesActions from '../store/prices/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import {pricesSelectors} from '../store/prices/reducer';
import {PriceTrendChart} from '../components';
import { withRouter } from 'react-router';
import { capitalizeFirstLetter } from '../utils';
import { getTokenStats } from '../store/tokenStats/reducer';

class TrendPriceChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.dataProvider ||
         !this.props.dataProvider.length) && nextProps.dataProvider.length ||
          nextProps.error) return true
    else return false
  }

  componentDidMount() {
    const trendKey = `fetch${capitalizeFirstLetter(this.props.match.params.ticker)}GoogleTrendsOverTime`;
    const priceKey = `fetch${capitalizeFirstLetter(this.props.match.params.ticker)}UsdOverTime`
    this.props.dispatch(
      googleTrendsActions[trendKey]())
    this.props.dispatch(
      pricesActions[priceKey]())
  }

  handleTimeIntervalChange(currency, interval) {
    this.props.dispatch(trendIndexChartsActions.updateChartInterval(currency, interval))
  }

  render() {

    return (
        <div className="container" style={{marginTop: '100px'}}>
          <div className="row">
            <div className="col-md-12">
            {
              this.props.error ?
              <div style={{
                textAlign: 'center',
                height: '320px',
                marginBottom: '50px'
              }}>Sorry, we currently don't have data on {this.props.ticker}</div> :
              <PriceTrendChart
                label={this.props.name}
                ticker={this.props.ticker}
                currencyPairLabel={`${this.props.ticker}/USD`}
                currencyPairValue={`${this.props.ticker.toLowerCase()}Usd`}
                googleTrendsLabel={`${this.props.name} google trends`}
                handleTimeIntervalChange={this.handleTimeIntervalChange}
                dataProvider={this.props.dataProvider}
              />
            }
            </div>
          </div>
        </div>

    );
  }
}

function getDataProvider(state, priceSelector, googleTrendSelector) {
  var googleTrendsOverTime = googleTrendSelector(state);
  var priceOverTime = priceSelector(state);
  var dataProvider = [];
  if (priceOverTime && priceOverTime.status === 404) return 404
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
  const ticker = capitalizeFirstLetter(ownProps.match.params.ticker)
  const dataProvider = getDataProvider(
      state, pricesSelectors[`get${ticker}UsdOverTime`], googleTrendsSelectors[`get${ticker}GoogleTrendsOverTime`]);
  const tokensByTicker = getTokenStats(state)[0];
  const name = _.isEmpty(tokensByTicker) ? ''
    : capitalizeFirstLetter(tokensByTicker[ticker.toLowerCase()].name)
  if (!tokensByTicker) return {}
  return {
    dataProvider: dataProvider,
    error: dataProvider === 404 ? true : false,
    name: name,
    ticker: ticker.toUpperCase()
  }
}

export default withRouter(connect(mapStateToProps)(TrendPriceChartWrapper))
