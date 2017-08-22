import axios from 'axios';

export function getPairPricesOverTime(currencyA, currencyB) {
  return axios.get(`/api/prices/${currencyA}${currencyB}/years`).then(res => res.data)
}
