import React, { PropTypes} from 'react'
import { Link } from 'react-router'

const RepoLink = (props) => (
  <Link {...props} activeStyle={{color:'white'}}/>
)

export default RepoLink
