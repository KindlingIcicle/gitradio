import React, { PropTypes } from 'react'
import VisibleEventList from '../containers/VisibleEventList'
import Greeting from './Greeting'

const App = ({firstName}) => (
  <div>
    <Greeting user={firstName}/>
    <div className='app-container'>
      <VisibleEventList />
    </div>
  </div>
)

export default App
