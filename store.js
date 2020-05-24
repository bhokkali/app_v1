import { createStore, applyMiddleware, compose } from 'redux'
//import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
//import createHistory from 'history/createBrowserHistory'
import rootReducer from './store/index'

const initialState = {}
const middleware = [thunk]


const composedEnhancers = compose(
  applyMiddleware(...middleware)
)

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
)



