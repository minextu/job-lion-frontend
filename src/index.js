import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <div id='main-wrapper'>
      <Header />
      <Main />
      <Footer />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
