import api from '../ApiClient';

export function requestLoginToken(email, password) {
  return {
    type: 'REQUEST_LOGIN_TOKEN',
    payload: _sendLoginRequest(email, password)
  };
}

export function logout() {
  localStorage.removeItem('loginToken');
  localStorage.removeItem('loginExpire');
  localStorage.removeItem('loginIsAdmin');
  return {
    type: 'LOGOUT'
  };
}

export function fetchLoginInfoIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().login;
    const info = state.info;
    if (Object.keys(info).length === 0 && !state.isFetching) {
      dispatch(fetchLoginInfo());
    }
  };
}

export function fetchLoginInfo() {
  return {
    type: 'FETCH_LOGIN_INFO',
    payload: _sendFetchInfoRequest()
  };
}

function _sendLoginRequest(email, password) {
  return api.post("v1/auth/login", { email, password })
    .then(json => {
      const { token, expire, user: { isAdmin } } = json;
      localStorage.setItem('loginToken', token);
      localStorage.setItem('loginExpire', expire);
      localStorage.setItem('loginIsAdmin', isAdmin);

      return { token, expire, isAdmin };
    });
}

function _sendFetchInfoRequest() {
  return api.get("v1/auth/info")
    .then(json => ({ info: json.user }));
}
