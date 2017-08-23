import * as types from './actionTypes';
import { getGoogleTrendOverTime, getDailyGoogleTrend } from '../../services/googleTrends';

function fetchGoogleTrendsOverTime(currency) {

  return () => {
    return async(dispatch, getState) => {
      try {
        const googleTrendsOverTime = await getGoogleTrendOverTime(currency);
        dispatch({ type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_2Y_FETCHED`], googleTrendsOverTime: googleTrendsOverTime });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

function fetchGoogleTrendsDaily(currency) {

  return () => {
    return async(dispatch, getState) => {
      try {
        const googleTrendsOverTime = await getDailyGoogleTrend(currency);
        dispatch({ type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_3M_FETCHED`], googleTrendsOverTime: googleTrendsOverTime });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const googleTrendsActions = {
  fetchEthGoogleTrendsOverTime: fetchGoogleTrendsOverTime('eth'),
  fetchBtcGoogleTrendsOverTime: fetchGoogleTrendsOverTime('btc'),
  fetchXrpGoogleTrendsOverTime: fetchGoogleTrendsOverTime('xrp'),
  fetchXemGoogleTrendsOverTime: fetchGoogleTrendsOverTime('xem'),
  fetchLtcGoogleTrendsOverTime: fetchGoogleTrendsOverTime('ltc'),

  fetchEthGoogleTrendsDaily: fetchGoogleTrendsDaily('eth'),
  fetchBtcGoogleTrendsDaily: fetchGoogleTrendsDaily('btc'),
  fetchXrpGoogleTrendsDaily: fetchGoogleTrendsDaily('xrp'),
  fetchXemGoogleTrendsDaily: fetchGoogleTrendsDaily('xem'),
  fetchLtcGoogleTrendsDaily: fetchGoogleTrendsDaily('ltc'),

  fetchAllGoogleTrendsOverTime: fetchGoogleTrendsOverTime('compare')
}

export default googleTrendsActions;
