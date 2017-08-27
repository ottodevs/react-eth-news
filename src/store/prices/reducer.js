import types from './actionTypes'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import { combineReducers } from 'redux'
import { getChartInterval } from '../trendIndexCharts/reducer'
import { capitalizeFirstLetter } from '../../utils'
import { currencies } from '../../constants'

const createSelectorOlderToken = (currency) =>
  (state) => {
    if (getChartInterval(state, currency) === '2Y') {
      if (!state.prices[`${currency}UsdOverTime`]) return
      return state.prices[`${currency}UsdOverTime`]
    } else {
      if (!state.prices[`${currency}UsdDaily`]) return
      return state.prices[`${currency}UsdDaily`]
    }
  }

const createSelectorYoungerToken = (currency) =>
  (state) => {
    if (getChartInterval(state, currency) === '2Y') {
      if (!state.prices[`${currency}UsdDaily`]) return
      return state.prices[`${currency}UsdDaily`]
    } else {
      if (!state.prices[`${currency}UsdDaily`]) return
      return state.prices[`${currency}UsdDaily`]
    }
  }

const createPricesWithPairingAndInterval = (currencyPairing = '', interval) =>
  (state = null, action) => {
    switch (action.type) {
      case `prices.${currencyPairing}_${interval}_FETCHED`:
        return action.pricesOverTime;
      case `prices.${currencyPairing}_${interval}_FETCHED`:
        return action.pricesOverTime;
      default:
        return state;
    }
  }

var reducers = {}

var selectors = {}

for (let ticker in currencies) {
  const overtime = `${ticker}UsdOverTime`
  const daily = `${ticker}UsdDaily`
  const capOvertime = `${capitalizeFirstLetter(ticker)}UsdOverTime`
  const capDaily = `${capitalizeFirstLetter(ticker)}UsdDaily`
  if (currencies[ticker].twoYears) {
    reducers[overtime] = createPricesWithPairingAndInterval(`${ticker.toUpperCase()}_USD`, '2Y')
    reducers[daily] = createPricesWithPairingAndInterval(`${ticker.toUpperCase()}_USD`, '3M')
    selectors[`get${capOvertime}`] = createSelectorOlderToken(ticker)
  } else {
    reducers[daily] = createPricesWithPairingAndInterval(`${ticker.toUpperCase()}_USD`, '3M')
    selectors[`get${capOvertime}`] = createSelectorYoungerToken(ticker)
  }
}

const rootReducer = combineReducers(reducers);

export default rootReducer;

export const pricesSelectors = selectors;
