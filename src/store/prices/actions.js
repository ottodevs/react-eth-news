import * as types from './actionTypes';
import { getPairPricesOverTime, getDailyPairPrices } from '../../services/prices';

function fetchCurrencyPairPricesOverTime(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {

      try {
        const pricesOverTime = await getPairPricesOverTime(currencyA, currencyB);
        dispatch({ type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_2Y_FETCHED`], pricesOverTime: pricesOverTime });
      } catch (error) {
        console.log(error);
      }

    }
  }
}

function fetchCurrencyPairPricesDaily(currencyA, currencyB) {
  return () => {
    return async(dispatch, getState) => {

      try {
        const pricesOverTime = await getDailyPairPrices(currencyA, currencyB);
        dispatch({ type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_3M_FETCHED`], pricesOverTime: pricesOverTime });
      } catch (error) {
        console.log(error);
      }

    }
  }
}

const pricesActions = {
  fetchEthUsdOverTime: fetchCurrencyPairPricesOverTime('eth', 'usd'),
  fetchBtcUsdOverTime: fetchCurrencyPairPricesOverTime('btc', 'usd'),
  fetchXrpUsdOverTime: fetchCurrencyPairPricesOverTime('xrp', 'usd'),
  fetchXemUsdOverTime: fetchCurrencyPairPricesOverTime('xem', 'usd'),
  fetchLtcUsdOverTime: fetchCurrencyPairPricesOverTime('ltc', 'usd'),
  fetchEthUsdDaily: fetchCurrencyPairPricesDaily('eth', 'usd'),
  fetchBtcUsdDaily: fetchCurrencyPairPricesDaily('btc', 'usd'),
  fetchXrpUsdDaily: fetchCurrencyPairPricesDaily('xrp', 'usd'),
  fetchXemUsdDaily: fetchCurrencyPairPricesDaily('xem', 'usd'),
  fetchLtcUsdDaily: fetchCurrencyPairPricesDaily('ltc', 'usd'),
}

export default pricesActions
