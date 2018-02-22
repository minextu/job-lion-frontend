const defaultState = {
  isFetching: false,
  loggedIn: !!localStorage.getItem('loginToken'),
  token: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : null,
  errorCode: null,
  redirectUrl: null
};

export default function loginReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_LOGIN_TOKEN':
    return {
      ...state,
      isFetching: true,
      loggedIn: false,
      token: null,
      errorCode: null
    };
  case 'RECEIVE_LOGIN_TOKEN':
    return {
      ...state,
      isFetching: false,
      loggedIn: true,
      token: action.token
    };
  case 'REQUEST_LOGIN_TOKEN_FAILURE':
    return {
      ...state,
      isFetching: false,
      errorCode: action.errorCode
    };
  case 'LOGOUT':
    return {
      ...state,
      loggedIn: false,
      token: null
    };
  case 'SET_LOGIN_REDIRECT_URL':
    return {
      ...state,
      redirectUrl: action.redirectUrl
    };
  default:
    return state;
  }
}
