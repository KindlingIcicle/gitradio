import React, { PropTypes } from 'react'
import Event from './Event'

const EventList = ({ events, onEventClick }) => (
  <ul>
    {events.map(event =>
                <Event key={event.id}
                  {...event}
                  onClick={() => onEventClick(event.id)}
                />
     )}
     test
  </ul>
)

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    event_type: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onEventClick: PropTypes.func.isRequired
}

export default EventList
