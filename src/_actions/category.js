import api from '../ApiClient';

export function requestCategories() {
  return _sendCategorieRequest();
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
