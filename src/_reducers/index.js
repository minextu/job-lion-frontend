import { combineReducers } from 'redux';
import login from './login';
import category from './category';
import company from './company';
import report from './report';
import register from './register';

import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = combineReducers({
  login,
  category,
  company,
  report,
  register,

  loadingBar: loadingBarReducer,
});

export default reducers;
