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

export function deleteCategory(categoryId) {
  return _sendDeleteCategoryRequest(categoryId);
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

function _deleteCategorySuccess(categoryId) {
  return {
    type: 'DELETE_CATEGORY_SUCCESS',
    categoryId
  };
}

function _requestDeleteCategory() {
  return {
    type: 'REQUEST_DELETE_CATEGORY'
  };
}

function _deleteCategoryFailure(errorCode) {
  return {
    type: 'DELETE_CATEGORY_FAILURE',
    errorCode
  };
}

function _sendDeleteCategoryRequest(categoryId) {
  return function (dispatch) {
    dispatch(_requestDeleteCategory());

    return api.delete(`v1/jobCategories/${categoryId}`)
      .then(json => {
        if (json.error) {
          dispatch(_deleteCategoryFailure(json.error));
        }
        else {
          dispatch(_deleteCategorySuccess(categoryId));
        }
      });
  };
}
