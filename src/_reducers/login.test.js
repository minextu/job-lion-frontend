import Reducer from './login';

test('REQUEST_LOGIN_TOKEN action changes state', () => {
  const action = {
    type: 'REQUEST_LOGIN_TOKEN'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    loggedIn: false,
    token: null,
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_LOGIN_TOKEN action changes state', () => {
  const action = {
    type: 'RECEIVE_LOGIN_TOKEN',
    token: 'testToken',
    expire: 1
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    loggedIn: true,
    token: 'testToken',
    expire: 1
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_LOGIN_TOKEN_FAILURE action changes state', () => {
  const action = {
    type: 'REQUEST_LOGIN_TOKEN_FAILURE',
    errorCode: 'testError'
  };
  const stateBefore = {

  };
  const stateAfter = {
    errorCode: 'testError',
    isFetching: false
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('LOGOUT action changes state', () => {
  const action = {
    type: 'LOGOUT',
  };

  const stateBefore = {
    isFetching: false,
    loggedIn: true,
    token: 'testToken'
  };

  const stateAfter = {
    isFetching: false,
    loggedIn: false,
    token: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('SET_LOGIN_REDIRECT_URL action changes state', () => {
  const action = {
    type: 'SET_LOGIN_REDIRECT_URL',
    redirectUrl: 'testUrl'
  };

  const stateBefore = {
  };

  const stateAfter = {
    redirectUrl: 'testUrl'
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});
