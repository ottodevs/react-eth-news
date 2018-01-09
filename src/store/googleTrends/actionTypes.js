import currenciesPromise from '../../currencies'

export default currenciesPromise
  .then(currencies => {
    var actionTypes = {
      COMPARE_GOOGLE_TRENDS_2Y_FETCHED: 'googleTrends.COMPARE_GOOGLE_TRENDS_2Y_FETCHED',
      COMPARE_GOOGLE_TRENDS_3M_FETCHED: 'googleTrends.COMPARE_GOOGLE_TRENDS_3M_FETCHED',
      'GOOGLE_TRENDS_FETCHED_IN_ERROR': 'googleTrends.GOOGLE_TRENDS_FETCHED_IN_ERROR'
    }

    for (let ticker in currencies) {
        actionTypes[`${ticker.toUpperCase()}_GOOGLE_TRENDS_2Y_FETCHED`] =
          `googleTrends.${ticker.toUpperCase()}_GOOGLE_TRENDS_2Y_FETCHED`
        actionTypes[`${ticker.toUpperCase()}_GOOGLE_TRENDS_3M_FETCHED`] =
          `googleTrends.${ticker.toUpperCase()}_GOOGLE_TRENDS_3M_FETCHED`

    }

    return actionTypes;
  })
