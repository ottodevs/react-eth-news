import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    ethUsdOverTime : createPricesWithPairing('ETH_USD'),
    btcUsdOverTime : createPricesWithPairing('BTC_USD'),
    xrpUsdOverTime : createPricesWithPairing('XRP_USD'),
    xemUsdOverTime : createPricesWithPairing('XEM_USD'),
    ltcUsdOverTime : createPricesWithPairing('LTC_USD'),
});

export default rootReducer;

export function getEthUsdOverTime(state) {
  if (!state.prices.ethUsdOverTime) return
  return state.prices.ethUsdOverTime
}

export function getBtcUsdOverTime(state) {
  if (!state.prices.btcUsdOverTime) return
  return state.prices.btcUsdOverTime
}

export function getXrpUsdOverTime(state) {
  if (!state.prices.xrpUsdOverTime) return
  return state.prices.xrpUsdOverTime
}

export function getXemUsdOverTime(state) {
  if (!state.prices.xemUsdOverTime) return
  return state.prices.xemUsdOverTime
}

export function getLtcUsdOverTime(state) {
  if (!state.prices.ltcUsdOverTime) return
  return state.prices.ltcUsdOverTime
}

function createPricesWithPairing(currencyPairing = '') {
    return function prices(state = null, action) {
        switch (action.type) {
            case `prices.${currencyPairing}_FETCHED`:
                return action.pricesOverTime;
            case `prices.${currencyPairing}_FETCHED`:
                return action.pricesOverTime;
            default:
                return state;
        }
    }
}



