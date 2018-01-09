import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import articles from './articles/reducer'
import sourceTypes from './sourceTypes/reducer';
import sources from './sources/reducer';
import dates from './dates/reducer';
import googleTrendsPromise from './googleTrends/reducer';
import pricesPromise from './prices/reducer';
import pagination from './pagination/reducer';
import trendIndexCharts from './trendIndexCharts/reducer';
import tokenStats from './tokenStats/reducer';


export default async() => {
  var googleTrends, prices;

  try {
    var googleTrends = await googleTrendsPromise
    var prices = await pricesPromise
  } catch (err) {
    console.log(err)
  }

  const reducer = combineReducers({
    user,
    articles,
    sourceTypes,
    sources,
    dates,
    googleTrends: googleTrends ? googleTrends.reducer : {},
    prices: googleTrends ? prices.reducer : {},
    pagination,
    trendIndexCharts,
    tokenStats
  })
  const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  const store = createStore(reducer, middleware)

  return store
}

