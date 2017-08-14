import * as types from './actionTypes';
import * as ethPricesService from '../../services/ethPrices';
import * as googleTrendsService from '../../services/googleTrends';

export function fetchGoogleTrendsOverTime() {
  return async dispatch => {
    try {
      const googleTrendsOverTime = await googleTrendsService.getGoogleTrendOverTime();
      dispatch({type: types.GOOGLE_TRENDS_FETCHED, googleTrendsOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}


export function fetchEthUsdOverTime() {
  return async dispatch => {
    try {
      const ethUsdOverTime = await ethPricesService.getEthUsdOverTime();
      dispatch({type: types.ETH_USD_FETCHED, ethUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}
