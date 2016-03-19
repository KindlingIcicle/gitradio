// connect
import { connect } from 'react-redux'
// import the component to connect
import EventList from '../components/EventList'
// import action for component
import { fetchEvents } from '../actions'
/*
 * Note: Original thought was to pass socket connection from State
 * to Props  here
 */


// takes store/state and returns an object to pass as props
const mapStateToProps = (state) => {
  return {
    events: state.events.items,
    repo: state.selectedRepo
  }
}


// maps onReceivedEvent with addEvent to props for use in VisibleEventList
const mapDispatchToProps = (dispatch) => {
  return {
    onReceivedEvent: (event) => {
      dispatch(addEvent(event.event_type, event.user))
    },
    requestRepoHistory: (repo) => {
      dispatch(fetchEvents(repo))
    }
  }
}

const VisibleEventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)

export default VisibleEventList
