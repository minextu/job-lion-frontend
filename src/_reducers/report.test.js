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
    reportList: [],
    reportOffset: null,
    fetchedCategories: [],
    errorCode: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('RECEIVE_REPORTS action changes state', () => {
  const action = {
    type: 'RECEIVE_REPORTS',
    categoryIds: [1],
    reports: [{ id: 0, name: "test" }],
    total: 2,
    offset: 3
  };
  const stateBefore = {

  };
  const stateAfter = {
    isFetching: false,
    reportList: [{ id: 0, name: "test" }],
    reportListTotal: 2,
    reportOffset: 3,
    fetchedCategories: [1]
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

test('REQUEST_REPORT_FAILURE action changes state', () => {
  const action = {
    type: 'REQUEST_REPORT_FAILURE',
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

test('REQUEST_CREATE_REPORT action changes state', () => {
  const action = {
    type: 'REQUEST_CREATE_REPORT'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isCreating: true,
    errorCodeCreate: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('CREATE_REPORT_SUCCESS action changes state', () => {
  const action = {
    type: 'CREATE_REPORT_SUCCESS',
  };
  const stateBefore = {
    isCreating: true,
  };
  const stateAfter = {
    isCreating: false,
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('CREATE_REPORT_FAILURE action changes state', () => {
  const action = {
    type: 'CREATE_REPORT_FAILURE',
    errorCode: 'testError'
  };
  const stateBefore = {

  };
  const stateAfter = {
    errorCodeCreate: 'testError',
    isCreating: false
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('REQUEST_DELETE_REPORT action changes state', () => {
  const action = {
    type: 'REQUEST_DELETE_REPORT'
  };
  const stateBefore = {

  };
  const stateAfter = {
    isDeleting: true,
    errorCodeDelete: null
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('DELETE_REPORT_SUCCESS action changes state', () => {
  const action = {
    type: 'DELETE_REPORT_SUCCESS',
    reportId: 2
  };
  const stateBefore = {
    isDeleting: true,
    reports: { 1: {}, 2: {}, 3: {} }
  };
  const stateAfter = {
    isDeleting: false,
    reports: { 1: {}, 3: {} }
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('DELETE_REPORT_FAILURE action changes state', () => {
  const action = {
    type: 'DELETE_REPORT_FAILURE',
    errorCode: 'testError'
  };
  const stateBefore = {

  };
  const stateAfter = {
    errorCodeDelete: 'testError',
    isDeleting: false
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('SELECT_CATEGORIES action changes state', () => {
  const action = {
    type: 'SELECT_CATEGORIES',
    categories: [0, 1]
  };
  const stateBefore = {

  };
  const stateAfter = {
    selectedCategories: [0, 1]
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});
