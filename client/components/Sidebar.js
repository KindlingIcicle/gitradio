import React, { PropTypes } from 'react'
import UserPanel from './UserPanel'
import VisibleRepoList from '../containers/VisibleRepoList'

const Sidebar = ({user}) => (
  <div className="sidebar">
    <UserPanel />
    <VisibleRepoList />
  </div>
) 

export default Sidebar
