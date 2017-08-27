import { currencies } from '../../constants'

var actionTypes = {}

for (let ticker in currencies) {
  if (currencies[ticker].twoYears) {
    actionTypes[`${ticker.toUpperCase()}_USD_2Y_FETCHED`] =
    `prices.${ticker.toUpperCase()}_USD_2Y_FETCHED`
    actionTypes[`${ticker.toUpperCase()}_USD_3M_FETCHED`] =
    `prices.${ticker.toUpperCase()}_USD_3M_FETCHED`
  } else {
    actionTypes[`${ticker.toUpperCase()}_USD_3M_FETCHED`] =
    `prices.${ticker.toUpperCase()}_USD_3M_FETCHED`
  }
}

export default actionTypes;

