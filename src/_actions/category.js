import api from '../ApiClient';

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().category;
    const categories = state.categories;

    if (categories.length === 0 && !state.isFetching) {
      dispatch(_sendCategorieRequest());
    }
  };
}

function _receiveCategories(categories) {
  return {
    type: 'RECEIVE_CATEGORIES',
    categories
  };
}

function _requestCategories() {
  return {
    type: 'REQUEST_CATEGORIES',
  };
}

function _receiveCategoriesFailure(errorCode) {
  return {
    type: 'REQUEST_CATEGORIES_FAILURE',
    errorCode
  };
}

function _sendCategorieRequest() {
  return function (dispatch) {
    dispatch(_requestCategories());

    return api.get("v1/jobCategories/")
      .then(json => {
        if (json.error) {
          dispatch(_receiveCategoriesFailure(json.error));
        }
        else {
          dispatch(_receiveCategories(json));
        }
      });
  };
}
