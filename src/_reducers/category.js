const defaultState = {
  isFetching: false,
  isDeleting: false,
  categories: [],
  errorCode: null,
  errorCodeDelete: null
};

export default function categoryReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_CATEGORIES':
    return {
      ...state,
      isFetching: true,
      categories: [], errorCode: null
    };
  case 'RECEIVE_CATEGORIES':
    return {
      ...state,
      isFetching: false,
      categories: action.categories
    };
  case 'REQUEST_CATEGORIES_FAILURE':
    return {
      ...state,
      isFetching: false,
      errorCode: action.errorCode
    };
  case 'REQUEST_DELETE_CATEGORY':
    return {
      ...state,
      isDeleting: true,
      errorCodeDelete: null
    };
  case 'DELETE_CATEGORY_SUCCESS':
    var category = state.categories.find(e => e.id === action.categoryId);
    return {
      ...state,
      isDeleting: false,
      categories: state.categories.filter(item => item !== category)
    };
  case 'DELETE_CATEGORY_FAILURE':
    return {
      ...state,
      isDeleting: false,
      errorCodeDelete: action.errorCode
    };
  default:
    return state;
  }
}
