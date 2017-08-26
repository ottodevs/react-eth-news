import _ from 'lodash';
import * as types from './actionTypes';
import { currencies } from '../../constants'

var initialState = {}

for (let ticker in currencies) {
  if (currencies[ticker].twoYears) {
    initialState[ticker] = '3M'
  } else {
    initialState[ticker] = '3M'
  }
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
