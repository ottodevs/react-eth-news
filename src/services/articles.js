import axios from 'axios';

export function getAllArticles() {
  return axios.get('/api/articles').then(res => res.data)
}
