import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = {
  ethUsdOverTime: null
}

export default function reduce(state = initialState, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case types.ETH_USD_FETCHED:
      newState.ethUsdOverTime = action.ethUsdOverTime;
    default:
      return newState;
  }
}

export function getEthUsdOverTime(state) {
  if (!state.ethPrices.ethUsdOverTime) return
  return state.ethPrices.ethUsdOverTime
}
