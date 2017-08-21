import * as types from './actionTypes';
import { getGoogleTrendOverTime } from '../../services/googleTrends';

function fetchGoogleTrendsOverTime(currency) {

  return () => {
    return async dispatch => {
      try {
        const googleTrendsOverTime = await getGoogleTrendOverTime(currency);
        dispatch({ type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_FETCHED`], googleTrendsOverTime: googleTrendsOverTime });
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
  fetchLtcGoogleTrendsOverTime: fetchGoogleTrendsOverTime('ltc')
}

export default googleTrendsActions;
