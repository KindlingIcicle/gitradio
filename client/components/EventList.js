import React, { PropTypes } from 'react'
import Event from './Event'
import io from 'socket.io-client'

// create socket
const socket = io()

class EventList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.events.map(event =>
                        <Event key={event.id}
                          {...event}
                         />
        )}
      </ul>
    )
  } 
  
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // set up socket listener to dispatch action
    socket.on('event', (event) => {
      this.props.onReceivedEvent(event)
    })
  }
}


EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onReceivedEvent: PropTypes.func.isRequired
}

export default EventList
