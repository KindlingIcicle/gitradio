import React, { PropTypes } from 'react'

const Greeting = ({user}) => (
  <h2>
    Hi, {user}.
  </h2>
)

Greeting.propTypes = {
  user: PropTypes.string.isRequired
}

export default Greeting
