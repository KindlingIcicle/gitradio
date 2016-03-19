import React, { PropTypes } from 'react'

const CreatorIntro = () => (
  <div className='creator-intro'>
    <h3>It looks like you're not listening to any repos yet.</h3>
    <span className='create-tagline'>It only takes one.</span>
  </div>
)

const SearchByOwner = () => (
  <form className='search-bar'>
    <input type='text' placeholder='Search by owner'/> {''}
  </form>
)

const HookCreator = (hooks) => (
  <div className='creator-container'>
    { hooks && <CreatorIntro/> }
    <SearchByOwner/>
  </div>
)

export default HookCreator
