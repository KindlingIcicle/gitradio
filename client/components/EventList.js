import React, { PropTypes } from 'react';
import Event from './Event';
import Loading from './Loading';
// import io from 'socket.io-client'

/* creates client socket connection
 * TODO: socket connection should occur on login instead
 *  const socket = io()
 */

class EventList extends React.Component {

  constructor(props) {
    super(props);
  }

  // set up socket listener to dispatch action
  //  TODO: remove requestRepoHistory from props and use dispatch instead
  componentWillMount() {
    //   socket.on('event', (event) => {
    //  this.props.onReceivedEvent(event)
    //  })
    // TODO: use eventsByRepo cache
    // fetch eventHistory on mount
    this.props.requestRepoHistory(this.props.repo);
  }

  // handles switching
  componentWillReceiveProps(nextProps) {
    if (nextProps.repo !== this.props.repo) {
      // const { repo } = nextProps;
      this.props.requestRepoHistory(nextProps.repo);
    }
  }

  render() {
    return (
      <div className="events-container">
        { this.props.isFetching && !this.props.events.length && <Loading/> }
        <ul>
         {this.props.events.map(event =>
                         <Event key={event.id}
                           {...event}
                         />
         )}
       </ul>
     </div>
   );
  }

}


EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  onReceivedEvent: PropTypes.func.isRequired,
  requestRepoHistory: PropTypes.func.isRequired,
  repo: PropTypes.string.isRequired,
};

export default EventList;
