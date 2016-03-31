import { connect } from 'react-redux';
import HookComponent from './Hook';
// TODO: define onHookSelect
import { onHookSelect } from '../actions';
const mapStateToProps = () => {
  return {
    isActive: false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHookSelect: () => {
      dispatch(onHookSelect());
    },
  };
};

const Hook = connect(
  mapStateToProps,
  mapDispatchToProps
)(HookComponent);

export default Hook;
