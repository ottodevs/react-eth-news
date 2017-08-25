import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import pricesActions from '../store/prices/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import * as pricesSelectors from '../store/prices/reducer';
import {PriceTrendChart} from '../components';


class BchPriceTrendChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.bchDataProvider || !this.props.bchDataProvider.length) && nextProps.bchDataProvider.length) return true
    else return false
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchBchGoogleTrendsDaily())
    this.props.dispatch(pricesActions.fetchBchUsdDaily())
  }

  handleTimeIntervalChange(currency, interval) {
    return
  }

  render() {
    return (

        <div >
          <PriceTrendChart
            label={'Bitcoin cash'}
            ticker={'bch'}
            currencyPairLabel={'BCH/USD'}
            currencyPairValue={'bchUsd'}
            googleTrendsLabel={'Bitcoin cash google trends'}
            handleTimeIntervalChange={this.handleTimeIntervalChange}
            dataProvider={this.props.bchDataProvider}
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
  const bchDataProvider = getDataProvider(
      state, pricesSelectors.getBchUsdOverTime, googleTrendsSelectors.getBchGoogleTrendsOverTime);
  return {
    bchDataProvider: bchDataProvider,

  }
}

export default connect(mapStateToProps)(BchPriceTrendChartWrapper)
