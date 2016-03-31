import React from 'react';
import Checkbox from './Checkbox';

const HookEvents = () => (
  <form className="events-form">
    <Checkbox defaultChecked value="comment_events" label="Code Comments"/>
    <Checkbox defaultChecked value="star_events" label="Stars"/>
    <Checkbox defaultChecked value="follow_events" label="Follows"/>
    <Checkbox defaultChecked value="fork_events" label="Forks"/>
    <Checkbox value="issue_events" label="Issues"/>
    <Checkbox defaultChecked value="pull_request_events" label="Pull Requests"/>
    <Checkbox value="deployment_events" label="Deployment"/>
    <Checkbox value="membership_events" label="Membership"/>
  </form>
);

export default HookEvents;
