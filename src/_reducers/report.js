const defaultState = {
  isFetching: false,
  isCreating: false,
  reportList: [],
  reportListTotal: null,
  reports: {},
  selectedCategories: [],
  fetchedCategories: [],
  reportOffset: null,
  errorCode: null,
  errorCodeCreate: null
};

export default function reportReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_REPORTS':
    return {
      ...state,
      isFetching: true,
      reportList: [],
      reportOffset: null,
      fetchedCategories: [],
      errorCode: null
    };
  case 'RECEIVE_REPORTS':
    return {
      ...state,
      isFetching: false,
      fetchedCategories: action.categoryIds,
      reportList: action.reports,
      reportListTotal: action.total,
      reportOffset: action.offset
    };
  case 'REQUEST_REPORTS_FAILURE':
    return {
      ...state,
      isFetching: false,
      errorCode: action.errorCode
    };
  case 'REQUEST_REPORT':
    return {
      ...state,
      isFetching: true,
      reports: {
        ...state.reports,
        [action.reportId]: {}
      },
      errorCode: null
    };
  case 'RECEIVE_REPORT':
    return {
      ...state,
      isFetching: false,
      reports: {
        ...state.reports,
        [action.reportId]: action.report
      }
    };
  case 'REQUEST_REPORT_FAILURE':
    return {
      ...state,
      isFetching: false,
      errorCode: action.errorCode
    };

  case 'REQUEST_CREATE_REPORT':
    return {
      ...state,
      isCreating: true,
      errorCodeCreate: null
    };
  case 'CREATE_REPORT_SUCCESS':
    return {
      ...state,
      isCreating: false
    };
  case 'CREATE_REPORT_FAILURE':
    return {
      ...state,
      isCreating: false,
      errorCodeCreate: action.errorCode
    };
  case 'SELECT_CATEGORIES':
    return {
      ...state,
      selectedCategories: action.categories
    };
  default:
    return state;
  }
}
