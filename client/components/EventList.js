import React, { PropTypes } from 'react'
import Event from './Event'
//import io from 'socket.io-client'

/* creates client socket connection
 * TODO: socket connection should occur on login instead 
 *  const socket = io()
 */

class EventList extends React.Component {

  render() {
    return (
      <div className="events-container">
        <ul>
         {this.props.events.map(event =>
                         <Event key={event.id}
                           {...event}
                          />
         )}
       </ul>
     </div>
    )
  } 
  
  constructor(props) {
    super(props)
  }

  // set up socket listener to dispatch action
  //TODO: refactor to be called from container VisibleEventList
  componentWillMount() {
    //   socket.on('event', (event) => {
    //  this.props.onReceivedEvent(event)
    //})
    // fetch eventHistory on mount
    this.props.requestRepoHistory('gitradio');
  }
}


EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onReceivedEvent: PropTypes.func.isRequired
}

export default EventList
