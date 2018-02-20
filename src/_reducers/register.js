const defaultState = {
  loading: false,
  success: false,
  errorCode: null
};

export default function registerReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_REGISTER':
    return {
      ...state,
      loading: true,
      success: false,
      errorCode: null
    };
  case 'REGISTER_SUCCESS':
    return {
      ...state,
      loading: false,
      success: true
    };
  case 'REGISTER_FAILURE':
    return {
      ...state,
      loading: false,
      errorCode: action.errorCode
    };
  default:
    return state;
  }
}
