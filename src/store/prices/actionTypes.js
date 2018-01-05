import currenciesPromise from '../../currencies'

export default currenciesPromise
  .then(currencies => {
    var actionTypes = {}

    for (let ticker in currencies) {
      actionTypes[`${ticker.toUpperCase()}_USD_2Y_FETCHED`] =
        `prices.${ticker.toUpperCase()}_USD_2Y_FETCHED`
      actionTypes[`${ticker.toUpperCase()}_USD_3M_FETCHED`] =
        `prices.${ticker.toUpperCase()}_USD_3M_FETCHED`
      if (ticker.toLowerCase() !== 'btc') {
        actionTypes[`${ticker.toUpperCase()}_BTC_2Y_FETCHED`] =
          `prices.${ticker.toUpperCase()}_BTC_2Y_FETCHED`
        actionTypes[`${ticker.toUpperCase()}_BTC_3M_FETCHED`] =
          `prices.${ticker.toUpperCase()}_BTC_3M_FETCHED`
      }
    }

    return actionTypes
  });
