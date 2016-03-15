// connect
import { connect } from 'react-redux'
// import component to connect
import RepoList from '../components/RepoList'
//import actions
import { selectRepo } from '../actions'

// returns an object to pass as props
const mapStateToProps = (state) => {
  return {
    repos: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRepoClick: (repo) => {
      dispatch(selectRepo(repo))
    }
  }
}

const VisibleRepoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoList)

export default VisibleRepoList
