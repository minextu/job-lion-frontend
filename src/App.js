import React from 'react';
import { Router } from 'react-router-dom';
import history from './history';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

const App = () => (
  <Router history={history}>
    <div id='App'>
      <Header />
      <Main />
      <Footer />
    </div>
  </Router>
);

export default App;
