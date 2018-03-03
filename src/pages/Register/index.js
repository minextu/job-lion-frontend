import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { register } from '../../_actions/register';
import AlertBox from '../../components/AlertBox';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      messageCode: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { firstName, lastName, email, password, password2 } = this.state;

    e.preventDefault();
    this.setState({ messageCode: null });

    if (password !== password2) {
      this.setState({ messageCode: "PasswordsNotEqual" });
      return;
    }

    this.props.dispatch(
      register(firstName, lastName, email, password)
    );
  }

  render() {
    // Show caught errors
    let messageCode;

    if (this.state.messageCode) {
      messageCode = this.state.messageCode;
    }
    else if (this.props.errorCode) {
      messageCode = this.props.errorCode;
    }
    else if (this.props.success) {
      messageCode = "RegisterSuccessful";
    }

    return (
      <div>
        <AlertBox messageCode={messageCode} />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fname">Vorname</label>
          <input type="text" className="jb-input" id="fname"
            required
            placeholder="Dein Vorname..."
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />

          <label htmlFor="lname">Nachname</label>
          <input type="text" className="jb-input" id="lname"
            required
            placeholder="Dein Nachname..."
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />

          <label htmlFor="email">Email</label>
          <input type="email" className="jb-input" id='email'
            required
            placeholder="Deine E-Mail Adresse..."
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <label htmlFor="password">Passwort</label>
          <input type="password" className="jb-input" id='password'
            required
            placeholder="Dein Passwort..."
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <label htmlFor="password2">Passwort erneut eingeben</label>
          <input type="password" className="jb-input" id="password2"
            required
            placeholder="Dein Passwort..."
            onChange={(e) => this.setState({ password2: e.target.value })}
          />

          <input className="jb-input" type="submit" value="Registrieren"/>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorCode: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.register.errorCode,
    loading: state.register.loading,
    success: state.register.success
  };
};

export default connect(mapStateToProps)(Register);
