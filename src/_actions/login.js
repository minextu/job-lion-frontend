import api from '../ApiClient';

export function login(email, password) {
  return _sendLoginRequest(email, password);
}

export function logout() {
  localStorage.removeItem('loginToken');
  localStorage.removeItem('loginExpire');
  localStorage.removeItem('loginIsAdmin');
  return {
    type: 'LOGOUT'
  };
}

function _receiveLoginToken(token, expire, isAdmin) {
  localStorage.setItem('loginToken', token);
  localStorage.setItem('loginExpire', expire);
  localStorage.setItem('loginIsAdmin', isAdmin);
  return {
    type: 'RECEIVE_LOGIN_TOKEN',
    token,
    expire,
    isAdmin
  };
}

function _requestLoginToken(email, password) {
  return {
    type: 'REQUEST_LOGIN_TOKEN',
    email,
    password
  };
}

function _receiveLoginTokenFailure(errorCode) {
  return {
    type: 'REQUEST_LOGIN_TOKEN_FAILURE',
    errorCode
  };
}

function _sendLoginRequest(email, password) {
  return function (dispatch) {
    dispatch(_requestLoginToken(email, password));

    return api.post("v1/auth/login", { email, password })
      .then(json => {
        if (json.error) {
          dispatch(_receiveLoginTokenFailure(json.error));
        }
        else {
          dispatch(_receiveLoginToken(json.token, json.expire, json.user.isAdmin));
        }
      });
  };
}
