import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const UserPanel = ({user}) => (
  <div className='userpanel'>
    <Link to='/app' className='username'>@{user}</Link>
    <ul className='settings'>
      <li><Link to='/app/repomanager'>Repo Manager</Link></li>
      <li><Link to='/app/settings'>Settings</Link></li>
      <li><a href="/logout">Sign Out</a></li>
    </ul>
  </div>
)

export default UserPanel
