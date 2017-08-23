import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import { combineReducers } from 'redux';
import { getChartInterval } from '../trendIndexCharts/reducer';

const rootReducer = combineReducers({
  ethUsdOverTime: createPricesWithPairingAndInterval('ETH_USD', '2Y'),
  btcUsdOverTime: createPricesWithPairingAndInterval('BTC_USD', '2Y'),
  xrpUsdOverTime: createPricesWithPairingAndInterval('XRP_USD', '2Y'),
  xemUsdOverTime: createPricesWithPairingAndInterval('XEM_USD', '2Y'),
  ltcUsdOverTime: createPricesWithPairingAndInterval('LTC_USD', '2Y'),
  ethUsdDaily: createPricesWithPairingAndInterval('ETH_USD', '3M'),
  btcUsdDaily: createPricesWithPairingAndInterval('BTC_USD', '3M'),
  xrpUsdDaily: createPricesWithPairingAndInterval('XRP_USD', '3M'),
  xemUsdDaily: createPricesWithPairingAndInterval('XEM_USD', '3M'),
  ltcUsdDaily: createPricesWithPairingAndInterval('LTC_USD', '3M'),
});

export default rootReducer;

export function getEthUsdOverTime(state) {
  if (getChartInterval(state, 'eth') === '2Y') {
    if (!state.prices.ethUsdOverTime) return
    return state.prices.ethUsdOverTime
  } else {
    if (!state.prices.ethUsdDaily) return
    return state.prices.ethUsdDaily
  }

}

export function getBtcUsdOverTime(state) {
  if (getChartInterval(state, 'btc') === '2Y') {
    if (!state.prices.btcUsdOverTime) return
    return state.prices.btcUsdOverTime
  } else {
    if (!state.prices.btcUsdDaily) return
    return state.prices.btcUsdDaily
  }
}

export function getXrpUsdOverTime(state) {
  if (getChartInterval(state, 'xrp') === '2Y') {
    if (!state.prices.xrpUsdOverTime) return
    return state.prices.xrpUsdOverTime
  } else {
    if (!state.prices.xrpUsdDaily) return
    return state.prices.xrpUsdDaily
  }
}

export function getXemUsdOverTime(state) {
  if (getChartInterval(state, 'xem') === '2Y') {
    if (!state.prices.xemUsdOverTime) return
    return state.prices.xemUsdOverTime
  } else {
    if (!state.prices.xemUsdDaily) return
    return state.prices.xemUsdDaily
  }
}

export function getLtcUsdOverTime(state) {
  if (getChartInterval(state, 'ltc') === '2Y') {
    if (!state.prices.ltcUsdOverTime) return
    return state.prices.ltcUsdOverTime
  } else {
    if (!state.prices.ltcUsdDaily) return
    return state.prices.ltcUsdDaily
  }
}

function createPricesWithPairingAndInterval(currencyPairing = '', interval) {
  return function prices(state = null, action) {
    switch (action.type) {
      case `prices.${currencyPairing}_${interval}_FETCHED`:
        return action.pricesOverTime;
      case `prices.${currencyPairing}_${interval}_FETCHED`:
        return action.pricesOverTime;
      default:
        return state;
    }
  }
}
