import React, { PropTypes } from 'react'

const UserPanel = ({user}) => (
  <div className='userpanel'>
    <a className='username'>@{user}</a>
    <ul className='settings'>
      <li>Repo Manager</li>
      <li>Settings</li>
      <li><a href="/logout">Sign Out</a></li>
    </ul>
  </div>
)

export default UserPanel
