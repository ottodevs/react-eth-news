import types from './actionTypes'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import { combineReducers } from 'redux'
import { getChartInterval } from '../trendIndexCharts/reducer'
import { capitalizeFirstLetter } from '../../utils'
import currenciesPromise from '../../currencies'


const createSelectorOlderToken = (currency) =>
  (state) => {
    if (getChartInterval(state, currency.toUpperCase()) === '2Y') {
      if (!state.prices[`${currency}UsdOverTime`]) return
      return state.prices[`${currency}UsdOverTime`]
    } else {
      if (!state.prices[`${currency}UsdDaily`]) return
      return state.prices[`${currency}UsdDaily`]
    }
  }

const createSelectorYoungerToken = (currency) =>
  (state) => {
    if (getChartInterval(state, currency.toUpperCase()) === '2Y') {
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

const createReducerForFetchingError = () =>
  (state = null, action) => {
    switch (action.type) {
      case `prices.PRICE_FETCHED_IN_ERROR`:
        return action.message
      default:
        return '';
    }
  }

export default currenciesPromise
  .then(currencies => {
    var reducers = {}

    var selectors = {}

    for (let ticker in currencies) {
      ticker = ticker.toLowerCase()
      const overtime = `${ticker}UsdOverTime`
      const daily = `${ticker}UsdDaily`
      reducers[overtime] = createPricesWithPairingAndInterval(`${ticker.toUpperCase()}_USD`, '2Y')
      reducers[daily] = createPricesWithPairingAndInterval(`${ticker.toUpperCase()}_USD`, '3M')
    }

    reducers['errorMessage'] = createReducerForFetchingError()

    const rootReducer = combineReducers(reducers);
    return {
      reducer: rootReducer,
      selectors
    }
  })

export const getPriceSelectorFromTicker = ticker => createSelectorOlderToken(ticker)

export const getPriceFetchingError = state => state.prices.errorMessage
