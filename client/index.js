import React from 'react'
import { render } from 'react-dom'
// Provider store to give access to store
import { Provider } from 'react-redux'
// Redux Store
import { createStore } from 'redux'
// Reducers
import gitRadioApp from './reducers'
// App component
import App from './components/App'

// createStore from combined Reducer
let store = createStore(gitRadioApp);

render(
  <div>
    <h1>GitRadio</h1>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
)
