import { connect } from 'react-redux'
// import component to connect
import AppComponent from '../components/App'
// import actions for component
import { fetchUserProfile } from '../actions/app'

// takes store/state and returns an object to pass as props
const mapStateToProps = (state) => {
  return {
    user: state.user, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => {
      dispatch(fetchUserProfile())
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default App
