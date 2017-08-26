import types from './actionTypes'
import { getGoogleTrendOverTime, getDailyGoogleTrend } from '../../services/googleTrends'
import { capitalizeFirstLetter } from '../../utils'
import { currencies } from '../../constants'

function fetchGoogleTrendsOverTime(currency) {

  return () =>
    async(dispatch, getState) => {
      const current = getState().googleTrends[`${currency}GoogleTrendsOverTime`];
      if (current && current.length) {
        dispatch({
          type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_2Y_FETCHED`],
          googleTrendsOverTime: current
        });
      } else {
        try {
          const googleTrendsOverTime = await getGoogleTrendOverTime(currency);
          dispatch({
            type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_2Y_FETCHED`],
            googleTrendsOverTime: googleTrendsOverTime
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

}

function fetchGoogleTrendsDaily(currency) {

  return () =>
    async(dispatch, getState) => {
      const current = getState().googleTrends[`${currency}GoogleTrendsDaily`]
      if (current && current.length) {
        dispatch({
          type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_3M_FETCHED`],
          googleTrendsOverTime: current
        });
      } else {
        try {
          const googleTrendsOverTime = await getDailyGoogleTrend(currency);
          dispatch({
            type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_3M_FETCHED`],
            googleTrendsOverTime: googleTrendsOverTime
          });
        } catch (error) {
          console.log(error);
        }
      }

    }

}

var googleTrendsActions = {
  fetchAllGoogleTrendsOverTime: fetchGoogleTrendsOverTime('compare')
}

for (let ticker in currencies) {
  const overtime = `fetch${capitalizeFirstLetter(ticker)}GoogleTrendsOverTime`
  const daily = `fetch${capitalizeFirstLetter(ticker)}GoogleTrendsDaily`
  if (currencies[ticker].twoYears) {
    googleTrendsActions[overtime] = fetchGoogleTrendsOverTime(ticker)
    googleTrendsActions[daily] = fetchGoogleTrendsDaily(ticker)
  } else {
    googleTrendsActions[overtime] = fetchGoogleTrendsDaily(ticker)
    googleTrendsActions[daily] = fetchGoogleTrendsDaily(ticker)
  }
}

export default googleTrendsActions;
