const defaultState = {
  isFetching: false,
  isCreating: false,
  reportsByCategory: {},
  reports: {},
  errorCode: null,
  errorCodeCreate: null
};

export default function reportReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_REPORTS':
    return {
      ...state,
      isFetching: true,
      reportsByCategory: {
        ...state.reportsByCategory,
        [action.categoryId]: []
      },
      errorCode: null
    };
  case 'RECEIVE_REPORTS':
    return {
      ...state,
      isFetching: false,
      reportsByCategory: {
        ...state.reportsByCategory,
        [action.categoryId]: action.reports
      }
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
  default:
    return state;
  }
}
