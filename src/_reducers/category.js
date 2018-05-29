const defaultState = {
  isFetching: false,
  isDeleting: false,
  categories: [],
  errorCode: null,
  errorCodeDelete: null
};

export default function categoryReducer(state = defaultState, action) {
  switch (action.type) {
  case 'FETCH_CATEGORIES_PENDING':
    return {
      ...state,
      isFetching: true,
      categories: [], errorCode: null
    };
  case 'FETCH_CATEGORIES_FULFILLED':
    return {
      ...state,
      isFetching: false,
      categories: action.payload.categories
    };
  case 'FETCH_CATEGORIES_REJECTED':
    return {
      ...state,
      isFetching: false,
      errorCode: action.payload.message
    };
  case 'DELETE_CATEGORY_PENDING':
    return {
      ...state,
      isDeleting: true,
      errorCodeDelete: null
    };
  case 'DELETE_CATEGORY_FULFILLED':
    var category = state.categories.find(e => e.id === action.payload.categoryId);
    return {
      ...state,
      isDeleting: false,
      categories: state.categories.filter(item => item !== category)
    };
  case 'DELETE_CATEGORY_REJECTED':
    return {
      ...state,
      isDeleting: false,
      errorCodeDelete: action.payload.message
    };
  default:
    return state;
  }
}
