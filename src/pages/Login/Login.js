import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AlertBox from '../../components/AlertBox';
import { requestLoginToken } from '../../_actions/login';
import history from '../../history';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.dispatch(
      requestLoginToken(email, password)
    );
  }

  componentDidUpdate() {
    // redirect to start if logged in
    if (this.props.loggedIn) {
      history.push('/');
    }
  }

  render() {
    const { loggedIn, customMessageCode, errorCode } = this.props;

    let messageCode;

    if (errorCode) {
      messageCode = errorCode;
    }
    else if (loggedIn) {
      messageCode = "LoginSuccessful";
    }
    else if (customMessageCode) {
      messageCode = customMessageCode;
    }

    return (
      <div className="Anmeldung">
        <h1>Anmelden</h1>
        <AlertBox messageCode={messageCode}/>

        <form onSubmit={this.handleSubmit}>

          <label htmlFor="email">Email</label>
          <input className="jb-input" required="required" type="email" id="email"
            placeholder="Deine E-Mail Adresse..."
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <label htmlFor="password">Passwort</label>
          <input className="jb-input" required="required" type="password" id="password"
            placeholder="Dein Passwort..."
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <input className="jb-input" type="submit" value="Anmelden" />
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
  customMessageCode: PropTypes.string,
  errorCode: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    customMessageCode: state.login.customMessageCode,
    errorCode: state.login.errorCode
  };
};

export default connect(mapStateToProps)(Login);
