import _ from 'lodash';
import * as types from './actionTypes';

const initialState = {
  tokensByTicker: undefined,
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOKEN_STATS_FETCHED:
      return { ...state, tokensByTicker: action.tokensByTicker }
    case types.TOKEN_STATS_FETCHED_IN_ERROR:
      return { ...state, errorMessage: action.message }
    default:
      return state;
  }
}

export function getTokenStats(state) {
  if (!state || !state.tokenStats) return
  return [
    _.keyBy(_.sortBy(
      state.tokenStats.tokensByTicker, [function(o) { return -o.marketCapUsd }]), 'ticker'),
    _.keys(state.tokenStats.tokensByTicker)
  ]
}

export function getTokenStatsFetchedError(state) {
  return state.tokenStats.errorMessage
}
