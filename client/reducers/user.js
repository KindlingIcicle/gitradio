import { REQUEST_USER, RECEIVE_USER } from '../actions'

/*
 * User Reducer
 */

export const currentUser = (state = {
  isFetching: false
}, action) => {
  switch(action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        currentUser: user  
      })
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
  }
}
