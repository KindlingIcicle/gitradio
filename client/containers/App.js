import { connect } from 'react-redux';
// import component to connect
import AppComponent from '../components/App';
// import actions for component
import { fetchUser } from '../actions';

// takes store/state and returns an object to pass as props
// pass currentUser obj as props to App component
const mapStateToProps = (state) => {
  return state.currentUser;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    },
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;
