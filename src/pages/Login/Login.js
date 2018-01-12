import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { login } from '../../_actions/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(e) {
    const { store } = this.context;

    store.dispatch(login(this.state.email, this.state.password));
    e.preventDefault();
  }

  render() {
    const { store } = this.context;

    let alertBox;
    let errorText = store.getState().login.error;
    if (errorText) {
      switch (errorText) {
      case "InvalidLogin":
        errorText = "E-Mail oder Passwort falsch!";
      }

      alertBox = (<div className="alert alert-danger">{errorText}</div>);
    }
    else if (store.getState().login.loggedIn) {
      alertBox = (<div className="alert alert-success">Erfolgreich angemeldet!</div>);
    }

    return (
      <div className="Anmeldung">
        {alertBox}
        <form action='#' onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input required="required" type="text" id="email" name="email" placeholder="Deine E-Mail Adresse..." onChange={(e) => this.setState({ email: e.target.value })}/>
          <label htmlFor="passwort">Passwort</label>
          <input required="required" type="password" id="passwort" name="passwort" placeholder="Dein Passwort..." onChange={(e) => this.setState({ password: e.target.value })}/>
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

Login.contextTypes = {
  store: PropTypes.object
};

export default Login;
