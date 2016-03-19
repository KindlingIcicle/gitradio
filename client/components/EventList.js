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
      <div className='events-container'>
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
  //TODO: remove requestRepoHistory from props and use dispatch instead 
  componentWillMount() {
    //   socket.on('event', (event) => {
    //  this.props.onReceivedEvent(event)
    //})
    // TODO: use eventsByRepo cache
    // fetch eventHistory on mount
    this.props.requestRepoHistory(this.props.repo)
  }
 
  // handles switching
  componentWillReceiveProps(nextProps) {
    if (nextProps.repo !== this.props.repo) {
      const { dispatch, repo } = nextProps
      this.props.requestRepoHistory(nextProps.repo)
    }
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
