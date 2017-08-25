import axios from 'axios';

export function getPairPricesOverTime(currencyA, currencyB) {
  return axios.get(`/api/prices/${currencyA}${currencyB}/years`).then(res => res.data)
}

export function getDailyPairPrices(currencyA, currencyB) {
  return axios.get(`/api/prices/${currencyA}${currencyB}/daily`).then(res => res.data)
}
