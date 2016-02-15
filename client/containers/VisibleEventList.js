// connect
import { connect } from 'react-redux'
// import the component to connect
import EventList from '../components/EventList'
// import action for component
import { addEvent } from '../actions'
// import io
//import io from 'socket.io-client'

//const socket = io()

// takes store/state and returns an object to pass as props
const mapStateToProps = (state) => {
  return {
    events: state.events,
    //    socket: socket
  }
}

// maps onReceivedEvent with addEvent to props for use in VisibleEventList
const mapDispatchToProps = (dispatch) => {
  return {
    onReceivedEvent: (event) => {
      dispatch(addEvent(event.event_type, event.user))
    }
  }
}

const VisibleEventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)

export default VisibleEventList
