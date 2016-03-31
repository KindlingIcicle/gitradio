// TODO: PropTypes
import React, { PropTypes } from 'react';
import HookList from './HookList';

const CreatorIntro = () => (
  <div className="creator-intro">
    <h3>It looks like you're not listening to any repos yet.</h3>
    <span className="create-tagline">It only takes one.</span>
  </div>
);

const SearchByOwner = () => (
  <form className="search-bar">
    <input type="text" placeholder="Search by owner"/> {""}
  </form>
);

class HookManager extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.repos.length) {
      this.props.fetchRepos();
    }
  }

  render() {
    return (<div className="creator-container">
      { this.props.hooks.length === 0 && <CreatorIntro/> }
      <SearchByOwner/>
      { this.props.isFetching ? <div className="loader">Loading</div> :
       <HookList repos={this.props.repos}/> }
    </div>);
  }
}

export default HookManager;
