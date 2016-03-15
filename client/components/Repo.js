import React, { PropTypes } from 'react'

const Repo = ({ onRepoClick, name }) => (
  <li
    onClick={onRepoClick}
  >
    {name}
  </li>
)

Repo.propTypes = {
  onClick: PropTypes.func.isRequired,
  //  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Repo
