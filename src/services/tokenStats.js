import axios from 'axios';

export const getTokenStats = () =>
  axios.get(`/api/google-trends/growth/weekly`)
    .then(res => res.data)
