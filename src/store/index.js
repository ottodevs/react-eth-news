import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import articles from './articles/reducer'
import sourceTypes from './sourceTypes/reducer';

const reducer = combineReducers({
  user,
  articles,
  sourceTypes
})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
