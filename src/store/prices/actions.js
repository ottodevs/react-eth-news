import typesPromise from './actionTypes'
import { getPairPricesOverTime, getDailyPairPrices } from '../../services/prices'
import { capitalizeFirstLetter } from '../../utils'
import currenciesPromise from '../../currencies'

function fetchCurrencyPairPricesOverTime(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {
      const current = getState().prices[`${currencyA}${capitalizeFirstLetter(currencyB)}OverTime`];
      typesPromise.then(async types => {
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
            if (currencyB === 'usd') {
              try {
                const pricesOverTimeInBtc = await getPairPricesOverTime(currencyA, 'btc');
                dispatch({
                  type: types[`${currencyA.toUpperCase()}_BTC_2Y_FETCHED`],
                  pricesOverTime: pricesOverTime
                });
              } catch (error) {
                if (error.response) {
                  dispatch({
                type: types.PRICE_FETCHED_IN_ERROR,
                message: `Sorry, we're having trouble loading the price of ${currencyA.toUpperCase()}. Please try again later.`
              });
                }
              }

            } else {
              if (error.response) {
                dispatch({
                type: types.PRICE_FETCHED_IN_ERROR,
                message: `Sorry, we're having trouble loading the price of ${currencyA.toUpperCase()}. Please try again later.`
              });
              }
            }

          }
        }

      })

    }
  }
}

function fetchCurrencyPairPricesDaily(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {
      const current = getState().prices[`${currencyA}${capitalizeFirstLetter(currencyB)}Daily`];
      typesPromise.then(async types => {
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
            if (currencyB === 'usd') {
              try {
                const pricesOverTimeInBtc = await getDailyPairPrices(currencyA, 'btc');
                dispatch({
                  type: types[`${currencyA.toUpperCase()}_BTC_3M_FETCHED`],
                  pricesOverTime: pricesOverTime
                });
              } catch (error) {
                if (error.response) {
                  dispatch({
                type: types.PRICE_FETCHED_IN_ERROR,
                message: `Sorry, we're having trouble loading the price of ${currencyA.toUpperCase()}. Please try again later.`
              });
                }
              }

            } else {
              if (error.response) {
                dispatch({
                type: types.PRICE_FETCHED_IN_ERROR,
                message: `Sorry, we're having trouble loading the price of ${currencyA.toUpperCase()}. Please try again later.`
              });
              }
            }

          }
        }
      })



    }
  }
}

export const fetchUsdPriceOverTimeFromTicker = ticker => fetchCurrencyPairPricesOverTime(ticker, 'usd')

export const fetchUsdPriceDailyFromTicker = ticker => fetchCurrencyPairPricesDaily(ticker, 'usd')
