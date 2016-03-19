import React, { PropTypes } from 'react'
import RepoLink from './RepoLink'

const Repo = ({ onRepoClick, name, owner }) => (
  <li
    onClick={onRepoClick}
  >
    <RepoLink to={`/app/feed/${owner}/${name}`}>
      {name}
    </RepoLink>
  </li>
)

Repo.propTypes = {
  onClick: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Repo
