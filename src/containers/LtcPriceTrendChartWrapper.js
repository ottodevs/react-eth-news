import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import pricesActions from '../store/prices/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import * as pricesSelectors from '../store/prices/reducer';
import {PriceTrendChart} from '../components';


class LtcPriceTrendChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.ltcDataProvider || !this.props.ltcDataProvider.length) && nextProps.ltcDataProvider.length) return true
    else return false
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchLtcGoogleTrendsOverTime())
    this.props.dispatch(pricesActions.fetchLtcUsdOverTime())
  }

  handleTimeIntervalChange(currency, interval) {
    this.props.dispatch(trendIndexChartsActions.updateChartInterval(currency, interval))
  }

  render() {
    return (

        <div >
          <PriceTrendChart
            label={'Litecoin'}
            ticker={'ltc'}
            currencyPairLabel={'LTC/USD'}
            currencyPairValue={'ltcUsd'}
            googleTrendsLabel={'Litecoin google trends'}
            handleTimeIntervalChange={this.handleTimeIntervalChange}
            dataProvider={this.props.ltcDataProvider}
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
  const ltcDataProvider = getDataProvider(
      state, pricesSelectors.getLtcUsdOverTime, googleTrendsSelectors.getLtcGoogleTrendsOverTime);
  return {
    ltcDataProvider: ltcDataProvider,

  }
}

export default connect(mapStateToProps)(LtcPriceTrendChartWrapper)
