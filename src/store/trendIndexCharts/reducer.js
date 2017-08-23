import _ from 'lodash';
import * as types from './actionTypes';

const initialState = {
  eth: '2Y',
  btc: '2Y',
  xrp: '2Y',
  xem: '2Y',
  ltc: '2Y'
}

export default function reduce(state = initialState, action = {}) {
  var newState = { ...state }
  switch (action.type) {
    case types.CHART_INTERVAL_UPDATED:
      newState[action.currency] = action.interval
      return newState
    default:
      return state;
  }
}

export function getChartInterval(state, currency) {
  return state.trendIndexCharts[currency]
}
