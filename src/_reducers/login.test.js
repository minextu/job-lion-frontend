require('jest-localstorage-mock');

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
    error: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_LOGIN_TOKEN action changes state', () => {
  const action = {
    type: 'RECEIVE_LOGIN_TOKEN',
    token: 'testToken'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    loggedIn: true,
    token: 'testToken'
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_LOGIN_TOKEN_FAILURE action changes state', () => {
  const action = {
    type: 'REQUEST_LOGIN_TOKEN_FAILURE',
    error: 'testError'
  };
  const stateBefore = {

  };
  const stateAfter = {
    error: 'testError',
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
