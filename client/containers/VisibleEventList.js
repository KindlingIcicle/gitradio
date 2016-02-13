// connect
import { connect } from 'react-redux'
// import the component to connect
import EventList from '../components/EventList'
// import action for component
import addEvent from '../actions'

// takes store/state and returns an object to pass as props
const mapStateToProps = (state) => {
  return {
    events: state.events 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEventClick: (id) => {
      dispatch(addEvent(id))
    }
  }
}

const VisibleEventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)

export default VisibleEventList
