import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import 'babel-polyfill';
import 'url-search-params-polyfill';

import reducers from './_reducers';
import App from './App';

// setup middleware
let middleware = [thunkMiddleware, promiseMiddleware(), loadingBarMiddleware()];
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();
  middleware = [...middleware, loggerMiddleware];
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(...middleware)
));

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
