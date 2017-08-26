import types from './actionTypes'
import moment from 'moment'
import { combineReducers } from 'redux'
import { capitalizeFirstLetter } from '../../utils'
import { currencies } from '../../constants'

const createSelectorOlderToken = (currency) =>
  (state) => {
    if (state.trendIndexCharts.eth === '2Y')
      return state.googleTrends[`${currency}GoogleTrendsOverTime`];
    else
      return state.googleTrends[`${currency}GoogleTrendsOverTime`]
  }

const createSelectorYoungerToken = (currency) =>
  (state) => {
    if (state.trendIndexCharts.eth === '2Y')
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


var reducers = {
  allGoogleTrendsOverTime: createGoogleTrendWithCurrency('COMPARE', '2Y')
}

var selectors = {}

for (let ticker in currencies) {
  const overtime = `${ticker}GoogleTrendsOverTime`
  const daily = `${ticker}GoogleTrendsDaily`
  const capOvertime = `${capitalizeFirstLetter(ticker)}GoogleTrendsOverTime`
  const capDaily = `${capitalizeFirstLetter(ticker)}GoogleTrendsDaily`
  if (currencies[ticker].twoYears) {
    reducers[overtime] = createGoogleTrendWithCurrency(ticker, '2Y')
    reducers[daily] = createGoogleTrendWithCurrency(ticker, '3M')
    selectors[`get${capOvertime}`] = createSelectorOlderToken(ticker)
  } else {
    reducers[daily] = createGoogleTrendWithCurrency(ticker, '3M')
    selectors[`get${capOvertime}`] = createSelectorYoungerToken(ticker)
  }
}

const rootReducer = combineReducers(reducers)

export default rootReducer;

export const googleTrendsSelectors = selectors;

export function getAllGoogleTrendsOverTime(state) {
  return state.googleTrends.allGoogleTrendsOverTime;
}
