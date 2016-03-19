import React, { PropTypes } from 'react'
import VisibleEventList from '../containers/VisibleEventList'
import Greeting from './Greeting'
import Sidebar from './Sidebar'

const App = ({firstName, username, children}) => (
  <div>
    <Greeting user={firstName}/>
    <div className='app-container'>
      <Sidebar user={username}/>
      <div className='main-view-container'>
        {children}
      </div>
    </div>
  </div>
)

export default App
