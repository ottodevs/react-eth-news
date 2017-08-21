import * as types from './actionTypes';
import * as googleTrendsService from '../../services/googleTrends';


export function fetchEthGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const ethGoogleTrendsOverTime = await googleTrendsService.getEthGoogleTrendOverTime();
      dispatch({type: types.ETH_GOOGLE_TRENDS_FETCHED, googleTrendsOverTime: ethGoogleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchBtcGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const btcGoogleTrendsOverTime = await googleTrendsService.getBtcGoogleTrendOverTime();
      dispatch({type: types.BTC_GOOGLE_TRENDS_FETCHED, googleTrendsOverTime: btcGoogleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchXrpGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const xrpGoogleTrendsOverTime = await googleTrendsService.getXrpGoogleTrendOverTime();
      dispatch({type: types.XRP_GOOGLE_TRENDS_FETCHED, googleTrendsOverTime: xrpGoogleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchXemGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const xemGoogleTrendsOverTime = await googleTrendsService.getXemGoogleTrendOverTime();
      dispatch({type: types.XEM_GOOGLE_TRENDS_FETCHED, googleTrendsOverTime: xemGoogleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}
export function fetchLtcGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const ltcGoogleTrendsOverTime = await googleTrendsService.getLtcGoogleTrendOverTime();
      dispatch({type: types.LTC_GOOGLE_TRENDS_FETCHED, googleTrendsOverTime: ltcGoogleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}
