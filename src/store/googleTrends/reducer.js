import * as types from './actionTypes';
import moment from 'moment';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  ethGoogleTrendsOverTime: createGoogleTrendWithCurrency('ETH', '2Y'),
  btcGoogleTrendsOverTime: createGoogleTrendWithCurrency('BTC', '2Y'),
  xrpGoogleTrendsOverTime: createGoogleTrendWithCurrency('XRP', '2Y'),
  xemGoogleTrendsOverTime: createGoogleTrendWithCurrency('XEM', '2Y'),
  ltcGoogleTrendsOverTime: createGoogleTrendWithCurrency('LTC', '2Y'),

  ethGoogleTrendsDaily: createGoogleTrendWithCurrency('ETH', '3M'),
  btcGoogleTrendsDaily: createGoogleTrendWithCurrency('BTC', '3M'),
  xrpGoogleTrendsDaily: createGoogleTrendWithCurrency('XRP', '3M'),
  xemGoogleTrendsDaily: createGoogleTrendWithCurrency('XEM', '3M'),
  ltcGoogleTrendsDaily: createGoogleTrendWithCurrency('LTC', '3M'),

  allGoogleTrendsOverTime: createGoogleTrendWithCurrency('COMPARE', '2Y')
})

export default rootReducer;

export function getEthGoogleTrendsOverTime(state) {
  if (state.trendIndexCharts.eth === '2Y') return state.googleTrends.ethGoogleTrendsOverTime;
  else return state.googleTrends.ethGoogleTrendsDaily
}

export function getBtcGoogleTrendsOverTime(state) {
  if (state.trendIndexCharts.btc === '2Y') return state.googleTrends.btcGoogleTrendsOverTime;
  else return state.googleTrends.btcGoogleTrendsDaily
}

export function getXrpGoogleTrendsOverTime(state) {
  if (state.trendIndexCharts.xrp === '2Y') return state.googleTrends.xrpGoogleTrendsOverTime;
  else return state.googleTrends.xrpGoogleTrendsDaily
}

export function getXemGoogleTrendsOverTime(state) {
  if (state.trendIndexCharts.xem === '2Y') return state.googleTrends.xemGoogleTrendsOverTime;
  else return state.googleTrends.xemGoogleTrendsDaily
}

export function getLtcGoogleTrendsOverTime(state) {
  if (state.trendIndexCharts.ltc === '2Y') return state.googleTrends.ltcGoogleTrendsOverTime;
  else return state.googleTrends.ltcGoogleTrendsDaily
}

export function getAllGoogleTrendsOverTime(state) {
  return state.googleTrends.allGoogleTrendsOverTime;
}

function createGoogleTrendWithCurrency(currency = '', interval) {
    return function googleTrends(state = null, action) {
        switch (action.type) {
            case `googleTrends.${currency}_GOOGLE_TRENDS_${interval}_FETCHED`:
                return action.googleTrendsOverTime;
            case `googleTrends.${currency}_GOOGLE_TRENDS_${interval}_FETCHED`:
                return action.googleTrendsOverTime;
            default:
                return state;
        }
    }
}
