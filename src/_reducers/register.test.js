import Reducer from './register';

test('REQUEST_REGISTER action changes state', () => {
  const action = {
    type: 'REQUEST_REGISTER'
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

test('REGISTER_SUCCESS action changes state', () => {
  const action = {
    type: 'REGISTER_SUCCESS',
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

test('REGISTER_FAILURE action changes state', () => {
  const action = {
    type: 'REGISTER_FAILURE',
    errorCode: 'testError'
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
