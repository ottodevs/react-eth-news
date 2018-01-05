import { getTokenStats } from './services/tokenStats'
export default getTokenStats()
  .then(tokenStats => {
    var currencies = {}
    for (let ticker in tokenStats) {
      currencies[ticker] = '3M'
    }
    return currencies
  })
