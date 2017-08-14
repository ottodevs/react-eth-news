import * as types from './actionTypes';
import * as ethPricesService from '../../services/ethPrices';

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
