const defaultState = {
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  reportList: [],
  reportListTotal: null,
  reports: {},
  selectedCategories: [],
  fetchedCategories: [],
  reportOffset: null,
  errorCode: null,
  errorCodeCreate: null,
  errorCodeDelete: null
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
  case 'REQUEST_DELETE_REPORT':
    return {
      ...state,
      isDeleting: true,
      errorCodeDelete: null
    };
  case 'DELETE_REPORT_SUCCESS':
    return {
      ...state,
      isDeleting: false,
      reports: removeByKey(state.reports, action.reportId)
    };
  case 'DELETE_REPORT_FAILURE':
    return {
      ...state,
      isDeleting: false,
      errorCodeDelete: action.errorCode
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

// Ref: https://github.com/erikras/react-redux-universal-hot-example/issues/962#issuecomment-219354496
function removeByKey(object, deleteKey) {
  console.log(typeof deleteKey);
  return Object.keys(object)
    .filter(key => Number(key) !== deleteKey)
    .reduce((result, current) => {
      result[current] = object[current];
      return result;
    }, {});
}
