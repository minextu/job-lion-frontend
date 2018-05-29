const defaultState = {
  isFetching: false,
  companies: [],
  errorCode: null
};

export default function companyReducer(state = defaultState, action) {
  switch (action.type) {
  case 'FETCH_COMPANIES_PENDING':
    return {
      ...state,
      isFetching: true,
      companies: [], errorCode: null
    };
  case 'FETCH_COMPANIES_FULFILLED':
    return {
      ...state,
      isFetching: false,
      companies: action.payload.companies
    };
  case 'FETCH_COMPANIES_REJECTED':
    return {
      ...state,
      isFetching: false,
      errorCode: action.payload.message
    };
  default:
    return state;
  }
}
