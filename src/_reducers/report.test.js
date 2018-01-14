import Reducer from './report';

test('REQUEST_REPORTS action changes state', () => {
  const action = {
    type: 'REQUEST_REPORTS',
    categoryId: 1
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    reportsByCategory: { 1: [] },
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_REPORTS action changes state', () => {
  const action = {
    type: 'RECEIVE_REPORTS',
    categoryId: 1,
    reports: [{ id: 0, name: "test" }]
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    reportsByCategory: { 1: [{ id: 0, name: "test" }] }
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_REPORTS_FAILURE action changes state', () => {
  const action = {
    type: 'REQUEST_REPORTS_FAILURE',
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

test('REQUEST_REPORT action changes state', () => {
  const action = {
    type: 'REQUEST_REPORT',
    reportId: 0
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: true,
    reports: { 0: {} },
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_REPORT action changes state', () => {
  const action = {
    type: 'RECEIVE_REPORT',
    report: { id: 0, name: "test" },
    reportId: 0
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    reports: { 0: { id: 0, name: "test" } }
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});
