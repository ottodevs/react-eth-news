import * as types from './actionTypes';
import moment from 'moment';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  ethGoogleTrendsOverTime: createGoogleTrendWithCurrency('ETH'),
  btcGoogleTrendsOverTime: createGoogleTrendWithCurrency('BTC'),
  xrpGoogleTrendsOverTime: createGoogleTrendWithCurrency('XRP'),
  xemGoogleTrendsOverTime: createGoogleTrendWithCurrency('XEM'),
  ltcGoogleTrendsOverTime: createGoogleTrendWithCurrency('LTC')
})

export default rootReducer;

export function getEthGoogleTrendsOverTime(state) {
  return state.googleTrends.ethGoogleTrendsOverTime;
}

export function getBtcGoogleTrendsOverTime(state) {
  return state.googleTrends.btcGoogleTrendsOverTime;
}

export function getXrpGoogleTrendsOverTime(state) {
  return state.googleTrends.xrpGoogleTrendsOverTime;
}

export function getXemGoogleTrendsOverTime(state) {
  return state.googleTrends.xemGoogleTrendsOverTime;
}

export function getLtcGoogleTrendsOverTime(state) {
  return state.googleTrends.ltcGoogleTrendsOverTime;
}

function createGoogleTrendWithCurrency(currency = '') {
    return function googleTrends(state = null, action) {
        switch (action.type) {
            case `googleTrends.${currency}_GOOGLE_TRENDS_FETCHED`:
                return action.googleTrendsOverTime;
            case `googleTrends.${currency}_GOOGLE_TRENDS_FETCHED`:
                return action.googleTrendsOverTime;
            default:
                return state;
        }
    }
}
