const defaultState = {
  loading: false,
  success: false,
  errorCode: null
};

export default function registerReducer(state = defaultState, action) {
  switch (action.type) {
  case 'REQUEST_REGISTER_PENDING':
    return {
      ...state,
      loading: true,
      success: false,
      errorCode: null
    };
  case 'REQUEST_REGISTER_FULFILLED':
    return {
      ...state,
      loading: false,
      success: true
    };
  case 'REQUEST_REGISTER_REJECTED':
    return {
      ...state,
      loading: false,
      errorCode: action.payload.message
    };
  default:
    return state;
  }
}
