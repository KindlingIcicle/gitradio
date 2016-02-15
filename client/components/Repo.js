import React, { PropTypes } from 'react'

const Repo = ({ onClick, owner, name }) => (
  <li
    onClick={onClick}
  >
    {owner}/{name}
  </li>
)

Repo.propTypes = {
  onClick: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Repo
