import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import reducers from './_reducers';
import App from './App';

// setup middleware
let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();
  middleware = [...middleware, loggerMiddleware];
}

ReactDOM.render((
  <Provider store={createStore(reducers, applyMiddleware(...middleware))}>
    <App/>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
