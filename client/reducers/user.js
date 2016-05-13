import { REQUEST_USER, RECEIVE_USER, REQUEST_USER_REPOS, RECEIVE_USER_REPOS,
RECEIVE_HOOK_CREATION_SUCCESS } from '../actions';

/*
 * User Reducer
 * Upon receipt of the current user from the server, populates state with user info
 */

export const currentUser = (state = {
  isFetching: false,
  username: '',
  repos: [],
  hooks: [],
}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.data.githubID,
        username: action.data.username,
        name: action.data.name,
        firstName: action.data.name.split(' ')[0],
        hooks: [...state.hooks, ...action.data.hooks],
        //        profileUrl: action.data.html_url,
      });
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_USER_REPOS:
      return Object.assign({}, state, {
        isFetching: false,
        repos: action.data,
      });
    case REQUEST_USER_REPOS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_HOOK_CREATION_SUCCESS:
      return Object.assign({}, state, {
        hooks: [...state.hooks, {
          hook_id: action.data.hook_id,
          repo: action.data.repo,
          events: action.data.scopes,
        }],
      });
    default:
      return state;
  }
};
