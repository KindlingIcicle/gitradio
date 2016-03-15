import React, { PropTypes } from 'react'

//TODO: handle event parsing for accurate depictions
// This means to render we need conditionals
const Event = ({ onReceivedEvent, type, user, repo }) => (
  <li
  >
    <span className="event_summary"> 
      <a>@{user}</a> made a <a>{type}</a> to <a>{repo.name}</a>
    </span>
  </li>
)

Event.propTypes = {
  //  onReceivedEvent: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default Event
