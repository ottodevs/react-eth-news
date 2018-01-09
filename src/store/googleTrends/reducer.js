import types from './actionTypes'
import moment from 'moment'
import { combineReducers } from 'redux'
import { capitalizeFirstLetter } from '../../utils'
import currenciesPromise from '../../currencies'


const createSelectorOlderToken = (currency) =>
  (state) => {
    if (state.trendIndexCharts[currency.toUpperCase()] === '2Y')
      return state.googleTrends[`${currency}GoogleTrendsOverTime`];
    else
      return state.googleTrends[`${currency}GoogleTrendsDaily`]
  }

const createSelectorYoungerToken = (currency) =>
  (state) => {
    if (state.trendIndexCharts[currency.toUpperCase()] === '2Y')
      return state.googleTrends[`${currency}GoogleTrendsDaily`];
    else
      return state.googleTrends[`${currency}GoogleTrendsDaily`]
  }

const createGoogleTrendWithCurrency = (currency = '', interval) =>
  (state = null, action) => {
    switch (action.type) {
      case `googleTrends.${currency.toUpperCase()}_GOOGLE_TRENDS_${interval}_FETCHED`:
        return action.googleTrendsOverTime;
      case `googleTrends.${currency.toUpperCase()}_GOOGLE_TRENDS_${interval}_FETCHED`:
        return action.googleTrendsOverTime;
      default:
        return state;
    }
  }

const createReducerForFetchingError = () =>
  (state = null, action) => {
    switch (action.type) {
      case `googleTrends.GOOGLE_TRENDS_FETCHED_IN_ERROR`:
        return action.message
      default:
        return '';
    }
  }

export default currenciesPromise
  .then(currencies => {
    var reducers = {
      allGoogleTrendsOverTime: createGoogleTrendWithCurrency('COMPARE', '2Y')
    }

    var selectors = {}

    for (let ticker in currencies) {
      ticker = ticker.toLowerCase()
      const overtime = `${ticker}GoogleTrendsOverTime`
      const daily = `${ticker}GoogleTrendsDaily`
      reducers[overtime] = createGoogleTrendWithCurrency(ticker, '2Y')
      reducers[daily] = createGoogleTrendWithCurrency(ticker, '3M')

    }

    reducers['errorMessage'] = createReducerForFetchingError()

    const rootReducer = combineReducers(reducers)

    return {
      reducer: rootReducer,
      selectors


    }
  })

export const getAllGoogleTrendsOverTime = state => {
  if (!state.googleTrends) return
  return state.googleTrends.allGoogleTrendsOverTime;
}

export const getGoogleTrendSelectorFromTicker = ticker => createSelectorOlderToken(ticker)

export const getGoogleTrendFetchingError = state => state.googleTrends.errorMessage
