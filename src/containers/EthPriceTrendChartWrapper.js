import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import pricesActions from '../store/prices/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import * as pricesSelectors from '../store/prices/reducer';
import {PriceTrendChart} from '../components';


class EthPriceTrendChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.ethDataProvider || !this.props.ethDataProvider.length) && nextProps.ethDataProvider.length) return true
    else return false
  }

  componentDidMount() {
    this.props.dispatch(googleTrendsActions.fetchEthGoogleTrendsOverTime())
    this.props.dispatch(pricesActions.fetchEthUsdOverTime())
  }

  handleTimeIntervalChange(currency, interval) {
    this.props.dispatch(trendIndexChartsActions.updateChartInterval(currency, interval))
  }

  render() {
    return (

        <div >
          <PriceTrendChart
            label={'Ethererum'}
            ticker={'eth'}
            currencyPairLabel={'ETH/USD'}
            currencyPairValue={'ethUsd'}
            googleTrendsLabel={'Ethererum google trends'}
            handleTimeIntervalChange={this.handleTimeIntervalChange}
            dataProvider={this.props.ethDataProvider}
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
  const ethDataProvider = getDataProvider(
      state, pricesSelectors.getEthUsdOverTime, googleTrendsSelectors.getEthGoogleTrendsOverTime);
  return {
    ethDataProvider: ethDataProvider,

  }
}

export default connect(mapStateToProps)(EthPriceTrendChartWrapper)
