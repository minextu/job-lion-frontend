import api from '../ApiClient';

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().category;
    const categories = state.categories;

    if (categories.length === 0 && !state.isFetching) {
      dispatch(fetchCategories());
    }
  };
}

export function fetchCategories() {
  return {
    type: 'FETCH_CATEGORIES',
    payload: _sendFetchCategoriesRequest()
  };
}

export function deleteCategory(categoryId) {
  return {
    type: 'DELETE_CATEGORY',
    payload: _sendDeleteCategoryRequest(categoryId)
  };
}

function _sendFetchCategoriesRequest() {
  return api.get("v1/jobCategories/")
    .then(json => ({ categories: json }));
}

function _sendDeleteCategoryRequest(categoryId) {
  return api.delete(`v1/jobCategories/${categoryId}`)
    .then(() => ({ categoryId }));
}
