import axios from 'axios';

export function getGoogleTrendOverTime(currency) {
  return axios.get(`/api/google-trends/${currency}/years`).then(res => res.data)
}
