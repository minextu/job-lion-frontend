import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveLoginToken } from './_actions/login';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';

class App extends Component {
  componentWillMount() {
    // restore login session
    if (localStorage.getItem('loginToken')) {
      this.props.dispatch(
        receiveLoginToken(localStorage.getItem('loginToken'))
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div id='App'>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(App);
