import { connect } from 'react-redux';
import HookComponent from '../components/Hook';
// TODO: define onHookSelect
// import { onHookSelect } from '../actions';
import { postNewHook } from '../actions';

const mapStateToProps = () => {
  return {
    isActive: false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onHookSelect: () => {
    //   dispatch(onHookSelect());
    createHook: (repo) => {
      dispatch(postNewHook(repo));
    },
  };
};

const Hook = connect(
  mapStateToProps,
  mapDispatchToProps
)(HookComponent);

export default Hook;
