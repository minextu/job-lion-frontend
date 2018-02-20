import { combineReducers } from 'redux';
import login from './login';
import category from './category';
import report from './report';
import register from './register';

const reducers = combineReducers({
  login,
  category,
  report,
  register
});

export default reducers;
