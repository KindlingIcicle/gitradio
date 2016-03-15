import React, { PropTypes } from 'react'
import VisibleEventList from '../containers/VisibleEventList'
import Greeting from './Greeting'
import Sidebar from './Sidebar'

const App = ({firstName}) => (
  <div>
    <Greeting user={firstName}/>
    <div className='app-container'>
      <Sidebar />
      <VisibleEventList />
    </div>
  </div>
)

export default App
