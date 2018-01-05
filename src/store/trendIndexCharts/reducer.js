import _ from 'lodash';
import * as types from './actionTypes';
import { getTokenStats } from '../tokenStats/reducer'

var initialState = {}

export default function reduce(state = initialState, action = {}) {
  var newState = { ...state }
  switch (action.type) {
    case types.TOP_CURRENCIES_RECEIVED:
      for (let ticker in action.currencies) {
        newState[ticker] = '3M'
      }
      return newState
    case types.CHART_INTERVAL_UPDATED:
      newState[action.currency.toUpperCase()] = action.interval
      return newState
    default:
      return state;
  }
}

export function getAllTopCoinsAndInterval(state) {
  return state.trendIndexCharts
}

export function getChartInterval(state, currency) {
  return state.trendIndexCharts[currency]
}
