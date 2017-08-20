import axios from 'axios';

export function getEthUsdOverTime() {
  return axios.get('/api/prices/ethusd').then(res => res.data)
}

export function getBtcUsdOverTime() {
  return axios.get('/api/prices/btcusd').then(res => res.data)
}
