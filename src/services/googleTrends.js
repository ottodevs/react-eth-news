import axios from 'axios';

export function getGoogleTrendOverTime() {
  return axios.get('/api/google-trends').then(res => res.data)
}
