import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = Immutable({
  ethUsdOverTime: null
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ETH_USD_FETCHED:
      return state.merge({
        ethUsdOverTime: action.ethUsdOverTime
      });
    default:
      return state;
  }
}

export function getEthUsdOverTime(state) {
  if (!state.ethPrices.ethUsdOverTime) return
  return state.ethPrices.ethUsdOverTime
}
