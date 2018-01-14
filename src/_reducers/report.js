const defaultState = {
  isFetching: false,
  isCreating: false,
  reportsByCategory: {},
  reports: {},
  errorCode: null,
  errorCodeCreate: null
};

let changedReports = {};

export default function reportReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_REPORTS':
    changedReports = {};
    changedReports[action.categoryId] = [];

    return Object.assign({}, state, {
      isFetching: true,
      reportsByCategory: Object.assign({}, state.reportsByCategory, changedReports),
      errorCode: null
    });
  case 'RECEIVE_REPORTS':
    changedReports = {};
    changedReports[action.categoryId] = action.reports;

    return Object.assign({}, state, {
      isFetching: false,
      reportsByCategory: Object.assign({}, state.reportsByCategory, changedReports)
    });
  case 'REQUEST_REPORTS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      errorCode: action.errorCode
    });
  case 'REQUEST_REPORT':
    changedReports = {};
    changedReports[action.reportId] = {};

    return Object.assign({}, state, {
      isFetching: true,
      reports: Object.assign({}, state.reports, changedReports),
      errorCode: null
    });
  case 'RECEIVE_REPORT':
    changedReports = {};
    changedReports[action.reportId] = action.report;

    return Object.assign({}, state, {
      isFetching: false,
      reports: Object.assign({}, state.reports, changedReports)
    });
  case 'REQUEST_REPORT_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      errorCode: action.errorCode
    });

  case 'REQUEST_CREATE_REPORT':
    return Object.assign({}, state, {
      isCreating: true,
      errorCodeCreate: null
    });
  case 'CREATE_REPORT_SUCCESS':
    return Object.assign({}, state, {
      isCreating: false
    });
  case 'CREATE_REPORT_FAILURE':
    return Object.assign({}, state, {
      isCreating: false,
      errorCodeCreate: action.errorCode
    });
  default:
    return state;
  }
}
