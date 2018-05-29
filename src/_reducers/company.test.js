import Reducer from './company';

test('FETCH_COMPANIES_PENDING action changes state', () => {
  const action = {
    type: 'FETCH_COMPANIES_PENDING'
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

test('FETCH_COMPANIES_FULFILLED action changes state', () => {
  const action = {
    type: 'FETCH_COMPANIES_FULFILLED',
    payload: {
      companies: [{ id: 0, name: "test" }]
    }
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

test('FETCH_COMPANIES_REJECTED action changes state', () => {
  const action = {
    type: 'FETCH_COMPANIES_REJECTED',
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
