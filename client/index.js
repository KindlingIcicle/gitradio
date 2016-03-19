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
// import components needed
import App from './containers/App'
import VisibleEventList from './containers/VisibleEventList'
import RepoManager from './components/RepoManager'
import HookCreator from './components/HookCreator'
// fetchUser action to be called 
import { fetchUser } from './actions'
// react-router
// TODO: refactor routes into separate routes file
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

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
      <Router history={browserHistory}>
        <Route path="/app" component={App}>
          <Route path="/app/feed">
            <Route path="/app/feed/:owner/:repo" component={VisibleEventList}/>
          </Route>
              <Route path="/app/repomanager" component={HookCreator}/>
        </Route>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
)
