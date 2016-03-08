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
    user
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

// Repo-Feed actions
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
    events: json.data.map(event => event.data),
    receivedAt: Date.now() 
  }
}

/*
 * API Reducers
 *
 */
export const fetchEvents = (repo) => {
  return (dispatch) => {
    // inform state that API call has been initiated
    dispatch(requestRepoHistory(repo))
    
    // return a promise
    return fetch(`/api/events/${repo}`)
      .then(response => response.json())
      .then(json => 
            // dispatches received event
            dispatch(receiveRepoHistory(repo, json))
           )
  }
}

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(requestUserProfile)
    
    return fetch(`/api/currentuser`)
      .then(response => response.json())
      .then(json =>
            dispatch(receiveUserProfile(json))
           )
  }
}
