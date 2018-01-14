const defaultState = {
  isFetching: false,
  categories: [],
  errorCode: null
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
  default:
    return state;
  }
}
