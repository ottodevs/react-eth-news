import * as types from './actionTypes';
import * as pricesServices from '../../services/prices';

export function fetchEthUsdOverTime() {
  return async dispatch => {
    try {
      const ethUsdOverTime = await pricesServices.getEthUsdOverTime();
      dispatch({type: types.ETH_USD_FETCHED, pricesOverTime: ethUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchBtcUsdOverTime() {
  return async dispatch => {
    try {
      const btcUsdOverTime = await pricesServices.getBtcUsdOverTime();
      dispatch({type: types.BTC_USD_FETCHED, pricesOverTime: btcUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchXrpUsdOverTime() {
  return async dispatch => {
    try {
      const xrpUsdOverTime = await pricesServices.getXrpUsdOverTime();
      dispatch({type: types.XRP_USD_FETCHED, pricesOverTime: xrpUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchXemUsdOverTime() {
  return async dispatch => {
    try {
      const xemUsdOverTime = await pricesServices.getXemUsdOverTime();
      dispatch({type: types.XEM_USD_FETCHED, pricesOverTime: xemUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchLtcUsdOverTime() {
  return async dispatch => {
    try {
      const ltcUsdOverTime = await pricesServices.getLtcUsdOverTime();
      dispatch({type: types.LTC_USD_FETCHED, pricesOverTime: ltcUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}
