import React, { PropTypes } from 'react'

const UserPanel = ({ user }) => (
  <div className='userpanel'>
    <UserImage />
    <UserName />
    <Settings />
  </div>
)

export default UserPanel
