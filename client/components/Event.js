import React, { PropTypes } from 'react'

const Event = ({ onClick, event_type, user }) => (
  <li
    onClick={onClick}
  >
    @{user}
    {event_type}
  </li>
)

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  event_type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default Event
