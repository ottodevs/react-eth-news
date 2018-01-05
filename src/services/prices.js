import axios from 'axios';

export function getPairPricesOverTime(currencyA, currencyB) {
  return axios.get(`/api/prices/${currencyA.toLowerCase()}${currencyB.toLowerCase()}/years`).then(res => res.data)
}

export function getDailyPairPrices(currencyA, currencyB) {
  return axios.get(`/api/prices/${currencyA.toLowerCase()}${currencyB.toLowerCase()}/daily`).then(res => res.data)
}
