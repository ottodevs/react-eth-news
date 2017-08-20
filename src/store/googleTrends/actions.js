import * as types from './actionTypes';
import * as googleTrendsService from '../../services/googleTrends';

export function fetchGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const googleTrendsOverTime = await googleTrendsService.getEthGoogleTrendOverTime();
      dispatch({type: types.GOOGLE_TRENDS_FETCHED, googleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}
