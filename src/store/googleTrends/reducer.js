import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = Immutable({
  googleTrendsOverTime: null
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GOOGLE_TRENDS_FETCHED:
      return state.merge({
        googleTrendsOverTime: action.googleTrendsOverTime
      });
    default:
      return state;
  }
}

export function getGoogleTrendsOverTime(state) {
  if (!state.googleTrends.googleTrendsOverTime) return
  const googleTrendsOverTimeData = state.googleTrends.googleTrendsOverTime.default.timelineData;
  return _.map(googleTrendsOverTimeData, datum => {
    return {
      date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
      value: datum.value[0]
    }
  });
}
