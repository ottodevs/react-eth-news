import typesPromise from './actionTypes'
import { getPairPricesOverTime, getDailyPairPrices } from '../../services/prices'
import { capitalizeFirstLetter } from '../../utils'
import currenciesPromise from '../../currencies'

function fetchCurrencyPairPricesOverTime(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {
      console.log('??', currencyA, currencyB)
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
            if (error.response && error.response.status) {
              dispatch({
                type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_2Y_FETCHED`],
                pricesOverTime: 404
              });
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
                    type: types[`${currencyA.toUpperCase()}_BTC_3M_FETCHED`],
                    pricesOverTime: 404
                  });
                }
              }

            } else {
              if (error.response) {
                dispatch({
                  type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_3M_FETCHED`],
                  pricesOverTime: 404
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
