import types from './actionTypes'
import { getPairPricesOverTime, getDailyPairPrices } from '../../services/prices'
import { capitalizeFirstLetter } from '../../utils'
import { currencies } from '../../constants'

function fetchCurrencyPairPricesOverTime(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {
      const current = getState().prices[`${currencyA}${capitalizeFirstLetter(currencyB)}OverTime`];
      if (current && current.length) {
        dispatch({
          type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_2Y_FETCHED`],
          pricesOverTime: current
        });
      } else {
        try {
          const pricesOverTime = await getPairPricesOverTime(currencyA, currencyB);
          dispatch({
            type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_2Y_FETCHED`],
            pricesOverTime: pricesOverTime
          });
        } catch (error) {
          if (error.response.status) {
            dispatch({
              type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_2Y_FETCHED`],
              pricesOverTime: error.response
            });
          }

        }
      }
    }
  }
}

function fetchCurrencyPairPricesDaily(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {
      const current = getState().prices[`${currencyA}${capitalizeFirstLetter(currencyB)}Daily`];
      if (current && current.length) {
        dispatch({
          type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_3M_FETCHED`],
          pricesOverTime: current
        });
      } else {
        try {
          const pricesOverTime = await getDailyPairPrices(currencyA, currencyB);
          dispatch({
            type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_3M_FETCHED`],
            pricesOverTime: pricesOverTime
          });
        } catch (error) {
          if (error.response.status) {
            dispatch({
              type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_3M_FETCHED`],
              pricesOverTime: error.response
            });
          }

        }
      }


    }
  }
}

var pricesActions = {}

for (let ticker in currencies) {
  const overtime = `fetch${capitalizeFirstLetter(ticker)}UsdOverTime`
  const daily = `fetch${capitalizeFirstLetter(ticker)}UsdDaily`
  if (currencies[ticker].twoYears) {
    pricesActions[overtime] = fetchCurrencyPairPricesOverTime(ticker, 'usd')
    pricesActions[daily] = fetchCurrencyPairPricesDaily(ticker, 'usd')
  } else {
    pricesActions[overtime] = fetchCurrencyPairPricesDaily(ticker, 'usd')
    pricesActions[daily] = fetchCurrencyPairPricesDaily(ticker, 'usd')
  }
}

export default pricesActions
