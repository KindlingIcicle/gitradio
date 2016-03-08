import { REQUEST_USER, RECEIVE_USER } from '../actions'

/*
 * User Reducer
 * Upon receipt of the current user from the server, populates state with user info
 */

export const currentUser = (state = {
  isFetching: false,
  username: ''
}, action) => {
  switch(action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.data.id,
        username: action.data.username,
        name: action.data.displayName,
        firstName: action.data.displayName.split(' ')[0],
        profileUrl: action.data.profileUrl
      })
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}
