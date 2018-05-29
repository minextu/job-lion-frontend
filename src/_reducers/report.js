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
  case 'FETCH_REPORT_LIST_PENDING':
    return {
      ...state,
      isFetching: true,
      reportList: [],
      reportOffset: null,
      fetchedCategories: [],
      errorCode: null
    };
  case 'FETCH_REPORT_LIST_FULFILLED':
    return {
      ...state,
      isFetching: false,
      fetchedCategories: action.payload.categoryIds,
      reportList: action.payload.reports,
      reportListTotal: action.payload.total,
      reportOffset: action.payload.offset
    };
  case 'FETCH_REPORT_LIST_REJECTED':
    return {
      ...state,
      isFetching: false,
      errorCode: action.payload.message
    };
  case 'FETCH_REPORT_PENDING':
    return {
      ...state,
      isFetching: true,
      reports: {
        ...state.reports,
        [action.meta.reportId]: {}
      },
      errorCode: null
    };
  case 'FETCH_REPORT_FULFILLED':
    return {
      ...state,
      isFetching: false,
      reports: {
        ...state.reports,
        [action.meta.reportId]: action.payload.report
      }
    };
  case 'FETCH_REPORT_REJECTED':
    return {
      ...state,
      isFetching: false,
      errorCode: action.payload.message
    };
  case 'CREATE_REPORT_PENDING':
    return {
      ...state,
      isCreating: true,
      errorCodeCreate: null
    };
  case 'CREATE_REPORT_FULFILLED':
    return {
      ...state,
      isCreating: false
    };
  case 'CREATE_REPORT_REJECTED':
    return {
      ...state,
      isCreating: false,
      errorCodeCreate: action.payload.message
    };
  case 'DELETE_REPORT_PENDING':
    return {
      ...state,
      isDeleting: true,
      errorCodeDelete: null
    };
  case 'DELETE_REPORT_FULFILLED':
    return {
      ...state,
      isDeleting: false,
      reports: removeByKey(state.reports, action.payload.reportId)
    };
  case 'DELETE_REPORT_REJECTED':
    return {
      ...state,
      isDeleting: false,
      errorCodeDelete: action.payload.message
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
