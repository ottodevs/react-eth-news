import * as types from './actionTypes';
import moment from 'moment';

const initialState = {
  googleTrendsOverTime: null
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GOOGLE_TRENDS_FETCHED:
      return {...state, googleTrendsOverTime: action.googleTrendsOverTime}
    default:
      return state;
  }
}

export function getGoogleTrendsOverTime(state) {
  return state.googleTrends.googleTrendsOverTime;
}
