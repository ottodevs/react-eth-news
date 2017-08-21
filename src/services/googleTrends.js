import axios from 'axios';

export function getEthGoogleTrendOverTime() {
  return axios.get('/api/google-trends/eth').then(res => res.data)
}

export function getBtcGoogleTrendOverTime() {
  return axios.get('/api/google-trends/btc').then(res => res.data)
}

export function getXrpGoogleTrendOverTime() {
  return axios.get('/api/google-trends/xrp').then(res => res.data)
}

export function getXemGoogleTrendOverTime() {
  return axios.get('/api/google-trends/xem').then(res => res.data)
}

export function getLtcGoogleTrendOverTime() {
  return axios.get('/api/google-trends/ltc').then(res => res.data)
}
