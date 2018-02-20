import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../_actions/register';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      errorText: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { firstName, lastName, email, password, password2 } = this.state;

    e.preventDefault();
    this.setState({ errorText: null });

    if (password !== password2) {
      this.setState({ errorText: "Passwörter stimmen nicht überein!" });
      return;
    }

    this.props.dispatch(
      register(firstName, lastName, email, password)
    );
  }

  render() {
    // TODO: replace with common AlertBox component
    let errorText = null;
    let success = null;

    if (this.state.errorText) {
      errorText = this.state.errorText;
    }
    else if (this.props.errorCode) {
      errorText = this.props.errorCode;
    }
    else if (this.props.success) {
      success = "Erfolgreich registriert! Eine Bestätigungsemail wurde gesendet.";
    }

    return (
      <div>
        {
          errorText
          && <div className="alert alert-danger">{errorText}</div>
        }
        {
          success
          && <div className="alert alert-success">{success}</div>
        }

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
