// connect
import { connect } from 'react-redux';
// import component to connect
import RepoList from '../components/RepoList';
//  import actions
import { selectRepo } from '../actions';

// returns an object to pass as props
// TODO: currently dummy data. Populate with repos with created hooks
const mapStateToProps = () => {
  return {
    repos: [
      {
        id: 0,
        owner: 'banunatina',
        name: 'gitradio',
      },
      {
        id: 1,
        owner: 'banunatina',
        name: 'oauth-practice',
      }],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRepoClick: (repo) => {
      dispatch(selectRepo(repo));
    },
  };
};

const VisibleRepoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoList);

export default VisibleRepoList;
