import typesPromise from './actionTypes'
import { getGoogleTrendOverTime, getDailyGoogleTrend } from '../../services/googleTrends'
import { capitalizeFirstLetter } from '../../utils'
import currenciesPromise from '../../currencies'

function fetchGoogleTrendsOverTime(currency) {

  return () =>
    async(dispatch, getState) => {
      const current = getState().googleTrends[`${currency}GoogleTrendsOverTime`];
      typesPromise.then(async types => {
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
            dispatch({
              type: types[`${currency.toUpperCase()}_GOOGLE_TRENDS_2Y_FETCHED`],
              googleTrendsOverTime: 404
            });
          }
        }
      })
    }
}

function fetchGoogleTrendsDaily(currency) {

  return () =>
    async(dispatch, getState) => {
      const current = getState().googleTrends[`${currency}GoogleTrendsDaily`]
      typesPromise.then(async types => {
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
      })
    }

}


export const fetchGoogleTrendsOverTimeFromTicker = ticker => fetchGoogleTrendsOverTime(ticker, 'usd')

export const fetchGoogleTrendsDailyFromTicker = ticker => fetchGoogleTrendsDaily(ticker, 'usd')
