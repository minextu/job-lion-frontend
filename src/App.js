import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id='rootWrapper'>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
