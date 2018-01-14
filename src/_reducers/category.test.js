import Reducer from './category';

test('REQUEST_CATEGORIES action changes state', () => {
  const action = {
    type: 'REQUEST_CATEGORIES'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    categories: [],
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_CATEGORIES action changes state', () => {
  const action = {
    type: 'RECEIVE_CATEGORIES',
    categories: [{ id: 0, name: "test" }]
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    categories: [{ id: 0, name: "test" }]
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_CATEGORIES_FAILURE action changes state', () => {
  const action = {
    type: 'REQUEST_CATEGORIES_FAILURE',
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
