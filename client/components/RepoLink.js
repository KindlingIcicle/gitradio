// TODO: Validate propTypes
import React from 'react';
import { Link } from 'react-router';

const RepoLink = (props) => (
  <Link {...props} activeStyle={{ color: 'white' }}/>
);

export default RepoLink;
