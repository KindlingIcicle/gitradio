// import actions
import { SELECT_REPO, REQUEST_REPO_HISTORY, RECEIVE_REPO_HISTORY, RECEIVE_EVENT } from '../actions'

/*
 * Event Reducers
 * takes the previous state, the action, and returns the next state
 * Not giving a default state here is on purpose - the default is no event
 */ 
const event = (state, action) => {
  switch(action.type) {
    case RECEIVE_EVENT:
      // return an event object with id, user, event_type
      return {
        id: action.id,
        user: action.user,
        event_type: action.type
      }
    default:
      return state
  }
}

/*
 * Events Reducer
 * Using Object.assign to assign current state props to new state
 */
export const events = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch(action.type) {
    case RECEIVE_EVENT:
      return Object.assign({}, state, {
        // destructuring state to return current state (array of events)
        items: [
          ...state.items,
        // call Event Reducer - which returns an event
        event(undefined, action)
        ]
      }) 
    case REQUEST_REPO_HISTORY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_REPO_HISTORY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

// switches current active Repo
// TODO: change default to all
export const selectedRepo = (state = 'default', action) => {
  switch(action.type) {
    case SELECT_REPO:
      return action.repo
    default:
      return state
  }
}

// stores repo history in state
export const eventsByRepo = (state = {}, action) => {
  switch(action.type) {
    case REQUEST_REPO_HISTORY:
    case RECEIVE_REPO_HISTORY:
      return Object.assign({}, state, {
        [action.repo]: events(state[action.repo], action) 
      })
    default:
      return state
  }
}
