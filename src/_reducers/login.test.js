import Reducer from './login';

test('REQUEST_LOGIN_TOKEN_PENDING action changes state', () => {
  const action = {
    type: 'REQUEST_LOGIN_TOKEN_PENDING'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    loggedIn: false,
    token: null,
    isAdmin: false,
    errorCode: null,
    customMessageCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_LOGIN_TOKEN_FULFILLED action changes state', () => {
  const action = {
    type: 'REQUEST_LOGIN_TOKEN_FULFILLED',
    payload: {
      token: 'testToken',
      expire: 1,
      isAdmin: true
    }
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    loggedIn: true,
    token: 'testToken',
    expire: 1,
    isAdmin: true
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_LOGIN_TOKEN_REJECTED action changes state', () => {
  const action = {
    type: 'REQUEST_LOGIN_TOKEN_REJECTED',
    payload: new Error('testError')
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
    isAdmin: false,
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

test('FETCH_LOGIN_INFO_PENDING action changes state', () => {
  const action = {
    type: 'FETCH_LOGIN_INFO_PENDING'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    info: {},
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('FETCH_LOGIN_INFO_FULFILLED action changes state', () => {
  const action = {
    type: 'FETCH_LOGIN_INFO_FULFILLED',
    payload: {
      info: { id: 1, firstName: "test" }
    }
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    info: action.payload.info
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('FETCH_LOGIN_INFO_REJECTED action changes state', () => {
  const action = {
    type: 'FETCH_LOGIN_INFO_REJECTED',
    payload: new Error('testError')
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

test('SHOW_CUSTOM_LOGIN_MESSAGE_CODE action changes state', () => {
  const action = {
    type: 'SHOW_CUSTOM_LOGIN_MESSAGE_CODE',
    messageCode: 'test'
  };
  const stateBefore = {

  };
  const stateAfter = {
    customMessageCode: 'test'
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});
