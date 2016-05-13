// TODO: Refactor into separate files
import { polyfill } from 'es6-promise';
polyfill();
import fetch from 'isomorphic-fetch';

// User Actions
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER_REPOS = 'REQUEST_USER_REPOS';
export const RECEIVE_USER_REPOS = 'RECEIVE_USER_REPOS';

export const requestUserProfile = () => {
  return {
    type: REQUEST_USER,
  };
};

export const receiveUserProfile = (data) => {
  return {
    type: RECEIVE_USER,
    data,
  };
};

export const requestUserRepos = () => {
  return {
    type: REQUEST_USER_REPOS,
  };
};

export const receiveUserRepos = (data) => {
  return {
    type: RECEIVE_USER_REPOS,
    data,
  };
};

// Event Actions
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

export const receiveEvent = (event) => {
  return {
    type: RECEIVE_EVENT,
    id: event.id,
    event_type: event.type,
    user: event.user,
  };
};

// Event-Feed actions
export const SELECT_REPO = 'SELECT_REPO';
export const REQUEST_REPO_HISTORY = 'REQUEST_REPO_HISTORY';
export const RECEIVE_REPO_HISTORY = 'RECEIVE_REPO_HISTORY';

export const selectRepo = (repo) => {
  return {
    type: SELECT_REPO,
    repo,
  };
};

export const requestRepoHistory = (repo) => {
  return {
    type: REQUEST_REPO_HISTORY,
    repo,
  };
};

export const receiveRepoHistory = (repo, json) => {
  return {
    type: RECEIVE_REPO_HISTORY,
    repo,
    // TODO: design data for retrieved events
    data: json.map(item => {
      return {
        id: item.id,
        repo: {
          name: item.repo.name,
          url: item.repo.url,
        },
        branch: item.payload.ref,
        type: item.type,
        user: item.actor.login,
        createdAt: item.created_at,
      };
    }),
    receivedAt: Date.now(),
  };
};

/*
 * Async Actions
 */
export const fetchEvents = (repo) => {
  return (dispatch) => {
    // informs state that API call has been initiated
    dispatch(requestRepoHistory(repo));

    // parses response and dispatches action on success
    // TODO: error handling
    return fetch(`/api/me/repos/${repo}`, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json =>
            dispatch(receiveRepoHistory(repo, json))
          );
  };
};

// fetches user profile from server - credentials specified to ensure cookies are sent
export const fetchUser = () => {
  return (dispatch) => {
    dispatch(requestUserProfile());

    return fetch(`/api/me`, {
      credentials: 'same-origin',
    })
      .then((json) => {
        // TODO: remove console.log - this is for checking data back from server
        console.log(json);
        return json;
      })
      .then(response => response.json())
      .then(json =>
            dispatch(receiveUserProfile(json))
          );
  };
};

// fetches user repos from server
export const fetchUserRepos = () => {
  return (dispatch) => {
    dispatch(requestUserRepos());

    return fetch(`/api/me/repos`, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json =>
            dispatch(receiveUserRepos(json))
          );
  };
};

// Hook Actions
export const CREATE_HOOK = 'CREATE_HOOK';
export const REQUEST_HOOK_CREATION = 'REQUEST_HOOK_CREATION';
export const RECEIVE_HOOK_CREATION_SUCCESS = 'RECEIVE_HOOK_CREATION_SUCCESS';

export const createHook = (repo) => {
  return {
    type: CREATE_HOOK,
    repo,
  };
};

export const requestHookCreation = (repo) => {
  return {
    type: REQUEST_HOOK_CREATION,
    repo,
  };
};

export const receiveHookCreationSuccess = () => {
  return {
    type: RECEIVE_HOOK_CREATION_SUCCESS,
  };
};

export const postNewHook = (repo) => {
  return (dispatch) => {
    dispatch(requestHookCreation(repo));

    const owner = repo.owner.login;

    return fetch(`/api/me/hooks/create/${owner}/${repo.name}`, {
      method: 'POST',
      credentials: 'same-origin',
    })
      .then((response) => {
        console.log(response);
      });
  };
};
