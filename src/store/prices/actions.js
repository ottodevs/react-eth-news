import * as types from './actionTypes';
import { getPairPricesOverTime } from '../../services/prices';

function fetchCurrencyPairPricesOverTime(currencyA, currencyB) {
  return () => {
    return async dispatch => {
      try {
        const pricesOverTime = await getPairPricesOverTime(currencyA, currencyB);
        dispatch({ type: types[`${currencyA.toUpperCase()}_${currencyB.toUpperCase()}_FETCHED`], pricesOverTime: pricesOverTime });
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
  fetchLtcUsdOverTime: fetchCurrencyPairPricesOverTime('ltc', 'usd')
}

export default pricesActions
