import api from '../ApiClient';

export function requestRegister(firstName, lastName, email, password) {
  return {
    type: 'REQUEST_REGISTER',
    payload: _sendRegisterRequest(firstName, lastName, email, password)
  };
}

function _sendRegisterRequest(firstName, lastName, email, password) {
  return api.post("v1/auth/register", { firstName, lastName, email, password })
    .then(() => true);
}
