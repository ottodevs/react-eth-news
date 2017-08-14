import axios from 'axios';

export function getEthUsdOverTime() {
  return axios.get('/api/ether').then(res => res.data)
}
