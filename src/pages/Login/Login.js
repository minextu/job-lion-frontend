import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AlertBox from './AlertBox';
import { login } from '../../_actions/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.dispatch(login(this.state.email, this.state.password));
    e.preventDefault();
  }

  render() {
    return (
      <div className="Anmeldung">
        <AlertBox loggedIn={this.props.loggedIn} errorCode={this.props.error}/>
        <form action='#' onSubmit={this.handleSubmit}>

          <label htmlFor="email">Email</label>
          <input required="required" type="email" id="email"
            placeholder="Deine E-Mail Adresse..."
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <label htmlFor="passwort">Passwort</label>
          <input required="required" type="password" id="passwort"
            placeholder="Dein Passwort..."
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <input type="submit" value="Anmelden" />
        </form>
        <span>
          <Link to="/Registrieren">Registrieren</Link>
          <Link to="/PasswortVergessen" style={{ padding: '0 0 0 1em' }}>Passwort vergessen?</Link>
        </span>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    error: state.login.error
  };
};

export default connect(mapStateToProps)(Login);
