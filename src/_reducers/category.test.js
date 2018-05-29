import Reducer from './category';

test('FETCH_CATEGORIES_PENDING action changes state', () => {
  const action = {
    type: 'FETCH_CATEGORIES_PENDING'
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

test('FETCH_CATEGORIES_FULFILLED action changes state', () => {
  const action = {
    type: 'FETCH_CATEGORIES_FULFILLED',
    payload: {
      categories: [{ id: 0, name: "test" }]
    }
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

test('FETCH_CATEGORIES_REJECTED action changes state', () => {
  const action = {
    type: 'FETCH_CATEGORIES_REJECTED',
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

test('DELETE_CATEGORY_PENDING action changes state', () => {
  const action = {
    type: 'DELETE_CATEGORY_PENDING'
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

test('DELETE_CATEGORY_FULFILLED action changes state', () => {
  const action = {
    type: 'DELETE_CATEGORY_FULFILLED',
    payload: {
      categoryId: 2
    }
  };
  const stateBefore = {
    isDeleting: true,
    categories: [{ id: 1 }, { id: 2 }, { id: 3 }]
  };
  const stateAfter = {
    isDeleting: false,
    categories: [{ id: 1 }, { id: 3 }]
  };

  expect(
    Reducer(stateBefore, action)
  ).toEqual(stateAfter);
});

test('DELETE_CATEGORY_REJECTED action changes state', () => {
  const action = {
    type: 'DELETE_CATEGORY_REJECTED',
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
