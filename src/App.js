import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import Footer from './components/Layout/Footer';

const App = () => (
  <Router history={history}>
    <div id='App'>
      <Route component={Header} />
      <Main />
      <Footer />
    </div>
  </Router>
);

export default App;
