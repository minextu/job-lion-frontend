import Reducer from './register';

test('REQUEST_REGISTER_PENDING action changes state', () => {
  const action = {
    type: 'REQUEST_REGISTER_PENDING'
  };
  const stateBefore = {

  };
  const stateAfter = {
    loading: true,
    errorCode: null,
    success: false
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_REGISTER_FULFILLED action changes state', () => {
  const action = {
    type: 'REQUEST_REGISTER_FULFILLED',
  };
  const stateBefore = {
    loading: true,
  };
  const stateAfter = {
    loading: false,
    success: true
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_REGISTER_REJECTED action changes state', () => {
  const action = {
    type: 'REQUEST_REGISTER_REJECTED',
    payload: new Error('testError')
  };
  const stateBefore = {

  };
  const stateAfter = {
    errorCode: 'testError',
    loading: false
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});
