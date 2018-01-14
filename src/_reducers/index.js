import { combineReducers } from 'redux';
import login from './login';
import category from './category';
import report from './report';

const reducers = combineReducers({
  login,
  category,
  report
});

export default reducers;
