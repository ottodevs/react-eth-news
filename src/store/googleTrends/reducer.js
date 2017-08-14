import * as types from './actionTypes';
import moment from 'moment';

const initialState = {
  googleTrendsOverTime: null
}

export default function reduce(state = initialState, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case types.GOOGLE_TRENDS_FETCHED:
      newState.googleTrendsOverTime = action.googleTrendsOverTime;
    default:
      return newState;
  }
}

export function getGoogleTrendsOverTime(state) {
  // if (!state.googleTrends.googleTrendsOverTime) return
  return state.googleTrends.googleTrendsOverTime;
  // return _.map(googleTrendsOverTimeData, datum => {
  //   return {
  //     date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
  //     value: datum.value[0]
  //   }
  // });
}
