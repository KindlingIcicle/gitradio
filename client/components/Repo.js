import React, { PropTypes } from 'react'
import RepoLink from './RepoLink'

const Repo = ({ onRepoClick, name, owner }) => (
  <li
  >
    <RepoLink to={`/app/feed/${owner}/${name}`} onClick={() => onRepoClick(name)}>
      {name}
    </RepoLink>
  </li>
)

Repo.propTypes = {
  onRepoClick: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Repo
