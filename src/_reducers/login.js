const defaultState = {
  isFetching: false,
  loggedIn: !!localStorage.getItem('loginToken'),
  token: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : null,
  error: null
};

export default function loginReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_LOGIN_TOKEN':
    return Object.assign({}, state, {
      isFetching: true,
      loggedIn: false,
      token: null,
      error: null
    });
  case 'RECEIVE_LOGIN_TOKEN':
    return Object.assign({}, state, {
      isFetching: false,
      loggedIn: true,
      token: action.token
    });
  case 'REQUEST_LOGIN_TOKEN_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    });
  case 'LOGOUT':
    return Object.assign({}, state, {
      loggedIn: false,
      token: null
    });
  default:
    return state;
  }
}
