//import 'babel-polyfill'
import React from 'react'
// thunk redux middleware for async action creators
import thunkMiddleware from 'redux-thunk'
// logs actions - remove if in production
import createLogger from 'redux-logger'
// render function from react
import { render } from 'react-dom'
// Provider store to give access to store
import { Provider } from 'react-redux'
// Redux Store and middleware
import { createStore, applyMiddleware } from 'redux'
// Reducers
import gitRadioApp from './reducers'
// App component
import App from './containers/App'
// fetchUser action to be called 
import { fetchUser } from './actions'

const loggerMiddleware = createLogger()

// createStore from combined Reducer
let store = createStore(
  gitRadioApp, 
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(fetchUser()).then(() =>
  console.log(store.getState())
)

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
)
