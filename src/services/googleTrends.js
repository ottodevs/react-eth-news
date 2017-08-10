import axios from 'axios';
import moment from 'moment';

export function getGoogleTrendOverTime() {
  return axios.get('/api/google-trends').then(res => res.data)
}
