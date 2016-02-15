import React, { PropTypes } from 'react'
import UserPanel from './UserPanel'
import VisibleRepoList from '../containers/VisibleRepoList'
import AddRepo from '../containers/AddRepo' 

const Sidebar = ({user}) => (
  <div className="sidebar">
    <UserPanel />
    <VisibleRepoList />
    <AddRepo />
  </div>
) 

export default Sidebar
