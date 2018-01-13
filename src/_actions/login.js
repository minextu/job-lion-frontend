import api from '../ApiClient';

export function login(email, password) {
  return _sendLoginRequest(email, password);
}

export function receiveLoginToken(token) {
  localStorage.setItem('loginToken', token);
  return {
    type: 'RECEIVE_LOGIN_TOKEN',
    token
  };
}

export function logout() {
  localStorage.removeItem('loginToken');
  return {
    type: 'LOGOUT'
  };
}

function _requestLoginToken(email, password) {
  return {
    type: 'REQUEST_LOGIN_TOKEN',
    email,
    password
  };
}

function _receiveLoginTokenFailure(json) {
  return {
    type: 'REQUEST_LOGIN_TOKEN_FAILURE',
    error: json.error
  };
}

function _sendLoginRequest(email, password) {
  return function (dispatch) {
    dispatch(_requestLoginToken(email, password));

    return api.post("v1/auth/login", { email, password })
      .then(json => {
        if (json.error) {
          dispatch(_receiveLoginTokenFailure(json));
        }
        else {
          dispatch(receiveLoginToken(json.token));
        }
      });
  };
}
