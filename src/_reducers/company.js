const defaultState = {
  isFetching: false,
  companies: [],
  errorCode: null
};

export default function companyReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_COMPANIES':
    return {
      ...state,
      isFetching: true,
      companies: [], errorCode: null
    };
  case 'RECEIVE_COMPANIES':
    return {
      ...state,
      isFetching: false,
      companies: action.companies
    };
  case 'REQUEST_COMPANIES_FAILURE':
    return {
      ...state,
      isFetching: false,
      errorCode: action.errorCode
    };
  default:
    return state;
  }
}
