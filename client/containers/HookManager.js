// connect
import { connect } from 'react-redux';
// import component to connect
import HookManagerComponent from '../components/HookManager';

const mapStateToProps = (state) => {
  return state.currentUser;
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

const HookManager = connect(
  mapStateToProps
)(HookManagerComponent);

export default HookManager;
