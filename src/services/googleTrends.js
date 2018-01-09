import axios from 'axios';

export function getGoogleTrendOverTime(currency) {
  return axios.get(`/api/google-trends/${currency.toLowerCase()}/years`).then(res => res.data)
}

export function getDailyGoogleTrend(currency) {
  return axios.get(`/api/google-trends/${currency.toLowerCase()}/daily`).then(res => res.data)
}
