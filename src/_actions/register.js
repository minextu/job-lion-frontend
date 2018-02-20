import api from '../ApiClient';

export function register(firstName, lastName, email, password) {
  return _sendRegisterRequest(firstName, lastName, email, password);
}

function _requestRegister() {
  return {
    type: 'REQUEST_REGISTER',
  };
}

function _registerSuccess() {
  return {
    type: 'REGISTER_SUCCESS'
  };
}

function _registerFailure(errorCode) {
  return {
    type: 'REGISTER_FAILURE',
    errorCode
  };
}

function _sendRegisterRequest(firstName, lastName, email, password) {
  return function (dispatch) {
    dispatch(_requestRegister());

    return api.post("v1/auth/register", { firstName, lastName, email, password })
      .then(json => {
        if (json.error) {
          dispatch(_registerFailure(json.error));
        }
        else {
          dispatch(_registerSuccess());
        }
      });
  };
}
