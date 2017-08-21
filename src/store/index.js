import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import articles from './articles/reducer'
import sourceTypes from './sourceTypes/reducer';
import sources from './sources/reducer';
import dates from './dates/reducer';
import googleTrends from './googleTrends/reducer';
import prices from './prices/reducer';
import pagination from './pagination/reducer';

const reducer = combineReducers({
  user,
  articles,
  sourceTypes,
  sources,
  dates,
  googleTrends,
  prices,
  pagination
})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
