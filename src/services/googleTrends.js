import axios from 'axios';

export function getEthGoogleTrendOverTime() {
  return axios.get('/api/google-trends/eth').then(res => res.data)
}
