import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { reducer as flashReducer, middleware as flashMiddleware } from 'redux-flash'

import { reducer as authReducer } from './auth'
import { restServices } from './restServices'

export const history = createBrowserHistory()
const routerReducer = connectRouter(history)

const rootReducer = combineReducers({
  auth: authReducer,
  flash: flashReducer,
  router: routerReducer,
  ...restServices.reducers,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      flashMiddleware(),
      thunk,
    )
  )
)