import React, { PropTypes } from 'react'
import VisibleEventList from '../containers/VisibleEventList'
import Greeting from './Greeting'
import Sidebar from './Sidebar'
import Main from './Main'

const App = ({firstName, username, children}) => (
  <div>
    <Greeting user={firstName}/>
    <div className='app-container'>
      <Sidebar user={username}/>
      <Main children={children}/>
    </div>
  </div>
)

export default App
