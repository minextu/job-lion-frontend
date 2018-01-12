import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import reducers from './_reducers';
import App from './App';

const loggerMiddleware = createLogger();

ReactDOM.render((
  <Provider store={createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware))}>
    <App/>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
