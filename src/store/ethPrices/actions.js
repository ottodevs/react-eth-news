import * as types from './actionTypes';
import { getEthUsdOverTime } from '../../services/prices';

export function fetchEthUsdOverTime() {
  return async dispatch => {
    try {
      const ethUsdOverTime = await getEthUsdOverTime();
      dispatch({type: types.ETH_USD_FETCHED, ethUsdOverTime});
    } catch (error) {
      console.log(error);
    }
  }
}
