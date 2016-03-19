import React, { PropTypes } from 'react'
import Repo from './Repo'

const RepoList = ({ repos, onRepoClick }) => (
  <div className='repo-container'>
    <ul>
     {repos.map(repo =>
                <Repo key={repo.id}
                  {...repo}
                  onClick={() => onRepoClick(repo.id)}
                />
      )} 
    </ul>
  </div>
)

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRepoClick: PropTypes.func.isRequired
}

export default RepoList
