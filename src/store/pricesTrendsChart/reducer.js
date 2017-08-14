import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = {
  ethUsdOverTime: null,
  googleTrendsOverTime: null
}

export default function reduce(state = initialState, action = {}) {
  const newState = Object.assign({}, state);
  console.log(state)
  switch (action.type) {
    case types.ETH_USD_FETCHED:
      console.log('eth usd')
      newState.ethUsdOverTime = action.ethUsdOverTime;
    case types.GOOGLE_TRENDS_FETCHED:
      newState.googleTrendsOverTime = action.googleTrendsOverTime;
    default:
      return newState;
  }
}

export function getEthUsdOverTime(state) {
  return state.pricesTrendsChart.ethUsdOverTime
}

export function getGoogleTrendsOverTime(state) {
  return state.pricesTrendsChart.googleTrendsOverTime;
}

export function getChartData(state) {
  var googleTrendsOverTime = state.pricesTrendsChart.googleTrendsOverTime;
  var ethUsdOverTime = state.pricesTrendsChart.ethUsdOverTime;
  var dataProvider = [];
  if (googleTrendsOverTime && ethUsdOverTime) {
    var dataLength = googleTrendsOverTime.length <= ethUsdOverTime.length ?
      googleTrendsOverTime.length : ethUsdOverTime.length;
    googleTrendsOverTime = googleTrendsOverTime.slice(0, dataLength);
    ethUsdOverTime = ethUsdOverTime.slice(0, dataLength);
    dataProvider = _.merge(googleTrendsOverTime, ethUsdOverTime)
  }
  console.log(dataProvider)
  return dataProvider
}
