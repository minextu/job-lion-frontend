import Reducer from './report';

test('FETCH_REPORT_LIST_PENDING action changes state', () => {
  const action = {
    type: 'FETCH_REPORT_LIST_PENDING',
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

test('FETCH_REPORT_LIST_FULFILLED action changes state', () => {
  const action = {
    type: 'FETCH_REPORT_LIST_FULFILLED',
    payload: {
      categoryIds: [1],
      reports: [{ id: 0, name: "test" }],
      total: 2,
      offset: 3
    }
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

test('FETCH_REPORT_LIST_REJECTED action changes state', () => {
  const action = {
    type: 'FETCH_REPORT_LIST_REJECTED',
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

test('FETCH_REPORT_PENDING action changes state', () => {
  const action = {
    type: 'FETCH_REPORT_PENDING',
    meta: {
      reportId: 0
    }
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

test('FETCH_REPORT_FULFILLED action changes state', () => {
  const action = {
    type: 'FETCH_REPORT_FULFILLED',
    payload: {
      report: { id: 0, name: "test" }
    },
    meta: {
      reportId: 0
    }
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

test('FETCH_REPORT_REJECTED action changes state', () => {
  const action = {
    type: 'FETCH_REPORT_REJECTED',
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

test('CREATE_REPORT_PENDING action changes state', () => {
  const action = {
    type: 'CREATE_REPORT_PENDING'
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

test('CREATE_REPORT_FULFILLED action changes state', () => {
  const action = {
    type: 'CREATE_REPORT_FULFILLED',
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

test('CREATE_REPORT_REJECTED action changes state', () => {
  const action = {
    type: 'CREATE_REPORT_REJECTED',
    payload: new Error('testError')
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

test('DELETE_REPORT_PENDING action changes state', () => {
  const action = {
    type: 'DELETE_REPORT_PENDING'
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

test('DELETE_REPORT_FULFILLED action changes state', () => {
  const action = {
    type: 'DELETE_REPORT_FULFILLED',
    payload: {
      reportId: 2
    }
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

test('DELETE_REPORT_REJECTED action changes state', () => {
  const action = {
    type: 'DELETE_REPORT_REJECTED',
    payload: new Error('testError')
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
