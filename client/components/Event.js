import React, { PropTypes } from 'react'

const Event = ({ onReceivedEvent, event_type, user }) => (
  <li
  >
    @{user}
    {event_type}
  </li>
)

Event.propTypes = {
  //  onReceivedEvent: PropTypes.func.isRequired,
  event_type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default Event
