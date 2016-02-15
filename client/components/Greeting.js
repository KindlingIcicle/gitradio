import React, { PropTypes } from 'react'

const Greeting = ({user}) => (
  <h1>
    Hi, {user}.
  </h1>
)

Greeting.propTypes = {
  user: PropTypes.string.isRequired
}

export default Greeting
