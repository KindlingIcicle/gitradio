// TODO: define propTypes
import React from 'react';
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

const HookManager = ({ hooks, repos }) => (
  <div className="creator-container">
    { hooks.length > 0 && <CreatorIntro/> }
    <SearchByOwner/>
    <HookList repos={repos}/>
  </div>
);

export default HookManager;
