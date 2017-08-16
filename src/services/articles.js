import axios from 'axios';

export function getAllArticles(startDate, endDate) {
  if (!startDate || !endDate) return []
  return axios.get(`/api/articles/${startDate.unix()}/${endDate.unix()}`).then(res => res.data)
}
