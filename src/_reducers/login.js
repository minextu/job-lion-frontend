const defaultState = {
  isFetching: false,
  loggedIn: !!localStorage.getItem('loginToken'),
  expire: localStorage.getItem('loginExpire') ? Number(localStorage.getItem('loginExpire')) : 0,
  isAdmin: !!localStorage.getItem('loginIsAdmin'),
  token: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : null,
  info: {},
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
      isAdmin: false,
      errorCode: null
    };
  case 'RECEIVE_LOGIN_TOKEN':
    return {
      ...state,
      isFetching: false,
      loggedIn: true,
      expire: action.expire,
      isAdmin: action.isAdmin,
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
      isAdmin: false,
      token: null
    };
  case 'SET_LOGIN_REDIRECT_URL':
    return {
      ...state,
      redirectUrl: action.redirectUrl
    };
  case 'REQUEST_LOGIN_INFO':
    return {
      ...state,
      isFetching: true,
      info: {},
      errorCode: null
    };
  case 'RECEIVE_LOGIN_INFO':
    return {
      ...state,
      isFetching: false,
      info: action.info
    };
  case 'REQUEST_LOGIN_INFO_FAILURE':
    return {
      ...state,
      isFetching: false,
      errorCode: action.errorCode
    };
  default:
    return state;
  }
}
