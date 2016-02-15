// import react and proptypes
import React, { PropTypes } from 'react'
import VisibleEventList from '../containers/VisibleEventList'
import Greeting from './Greeting'

const App = () => (
  <div>
    <Greeting user='Banun'/>
    <div>
      <VisibleEventList />
    </div>
  </div>
)

export default App
