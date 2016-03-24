// TODO: Validate propTypes
import React from 'react';
import UserPanel from './UserPanel';
import VisibleRepoList from '../containers/VisibleRepoList';

const Sidebar = ({ user }) => (
  <div className="sidebar">
    <UserPanel user={user} />
    <VisibleRepoList />
  </div>
);

export default Sidebar;
