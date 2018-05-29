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
  case 'REQUEST_LOGIN_TOKEN_PENDING':
    return {
      ...state,
      isFetching: true,
      loggedIn: false,
      token: null,
      isAdmin: false,
      errorCode: null
    };
  case 'REQUEST_LOGIN_TOKEN_FULFILLED':
    return {
      ...state,
      isFetching: false,
      loggedIn: true,
      expire: action.payload.expire,
      isAdmin: action.payload.isAdmin,
      token: action.payload.token
    };
  case 'REQUEST_LOGIN_TOKEN_REJECTED':
    return {
      ...state,
      isFetching: false,
      errorCode: action.payload.message
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
  case 'FETCH_LOGIN_INFO_PENDING':
    return {
      ...state,
      isFetching: true,
      info: {},
      errorCode: null
    };
  case 'FETCH_LOGIN_INFO_FULFILLED':
    return {
      ...state,
      isFetching: false,
      info: action.payload.info
    };
  case 'FETCH_LOGIN_INFO_REJECTED':
    return {
      ...state,
      isFetching: false,
      errorCode: action.payload.message
    };
  default:
    return state;
  }
}
