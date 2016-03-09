//TODO: Refactor into separate files
import { polyfill } from 'es6-promise'; polyfill();
import fetch from 'isomorphic-fetch'

// User Actions
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUserProfile = () => {
  return {
    type: REQUEST_USER
  }
}

export const receiveUserProfile = (user) => {
  return {
    type: RECEIVE_USER,
    data: user.profile
  }
}

// Event Actions
export const RECEIVE_EVENT = 'RECEIVE_EVENT'

export const receiveEvent = (event) => {
  return {
    type: RECEIVE_EVENT,
    id: event.id,
    event_type: event.type,
    user: event.user
  }
}

// Repo/Event-Feed actions
export const SELECT_REPO = 'SELECT_REPO'
export const REQUEST_REPO_HISTORY = 'REQUEST_REPO_HISTORY'
export const RECEIVE_REPO_HISTORY = 'RECEIVE_REPO_HISTORY'

export const selectRepo = (repo) => {
  return {
    type: SELECT_REPO,
    repo
  } 
}

export const requestRepoHistory = (repo) => {
  return {
    type: REQUEST_REPO_HISTORY,
    repo
  }
}

export const receiveRepoHistory = (repo, json) => {
  return {
    type: RECEIVE_REPO_HISTORY,
    repo,
    // TODO: parse retrieved events
    // events: json.data.map(event => event.data),
    receivedAt: Date.now() 
  }
}

/*
 * Async Actions 
 */
export const fetchEvents = (repo) => {
  return (dispatch) => {
    // informs state that API call has been initiated
    dispatch(requestRepoHistory(repo))
    
    // parses response and dispatches action on success
    // TODO: error handling 
    return fetch(`/api/events/${repo}`)
      .then(response => response.json())
      .then(json => 
            // dispatches received event
            dispatch(receiveRepoHistory(repo, json))
           )
  }
}

// fetches user profile from server - credentials specified to ensure cookies are sent
export const fetchUser = () => {
  return (dispatch) => {
    dispatch(requestUserProfile)
    
    return fetch(`/api/me`, {
      credentials: 'same-origin'            
    })
      .then(response => response.json())
      .then(json =>
            dispatch(receiveUserProfile(json))
           )
  }
}
