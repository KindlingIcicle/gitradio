import React, { PropTypes } from 'react';
import Repo from './Repo';

const RepoList = ({ repos, onRepoClick }) => (
  <div className="repo-container">
    <ul>
     {repos.map(repo =>
                <Repo key={repo._id}
                  {...repo}
                  onRepoClick={onRepoClick}
                />
      )}
    </ul>
  </div>
);

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    hook_id: PropTypes.number.isRequired,
    repo: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onRepoClick: PropTypes.func.isRequired,
};

export default RepoList;
