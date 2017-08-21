import axios from 'axios';

export function getEthUsdOverTime() {
  return axios.get('/api/prices/ethusd').then(res => res.data)
}

export function getBtcUsdOverTime() {
  return axios.get('/api/prices/btcusd').then(res => res.data)
}

export function getXrpUsdOverTime() {
  return axios.get('/api/prices/xrpusd').then(res => res.data)
}

export function getXemUsdOverTime() {
  return axios.get('/api/prices/xemusd').then(res => res.data)
}

export function getLtcUsdOverTime() {
  return axios.get('/api/prices/ltcusd').then(res => res.data)
}
