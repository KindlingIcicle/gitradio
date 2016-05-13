import React, { PropTypes } from 'react';
import RepoLink from './RepoLink';

const Repo = ({ onRepoClick, repo }) => (
  <li>
    <RepoLink to={`/app/feed/${repo}/`} onClick={() => onRepoClick(repo)}>
      {repo}
    </RepoLink>
  </li>
);

Repo.propTypes = {
  onRepoClick: PropTypes.func.isRequired,
  repo: PropTypes.string.isRequired,
};

export default Repo;
