import Reducer from './company';

test('REQUEST_COMPANIES action changes state', () => {
  const action = {
    type: 'REQUEST_COMPANIES'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    companies: [],
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_COMPANIES action changes state', () => {
  const action = {
    type: 'RECEIVE_COMPANIES',
    companies: [{ id: 0, name: "test" }]
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    companies: [{ id: 0, name: "test" }]
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_COMPANIES_FAILURE action changes state', () => {
  const action = {
    type: 'REQUEST_COMPANIES_FAILURE',
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
