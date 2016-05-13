// connect
import { connect } from 'react-redux';
// import component to connect
import HookManagerComponent from '../components/HookManager';
import { fetchUserRepos } from '../actions';

const mapStateToProps = (state) => {
  return state.currentUser;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepos: () => {
      dispatch(fetchUserRepos());
    },
    // createHook: (repo) => {
    //   dispatch(postNewHook(repo));
    // },
  };
};

const HookManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(HookManagerComponent);

export default HookManager;
