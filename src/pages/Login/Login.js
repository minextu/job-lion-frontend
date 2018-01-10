import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className="Anmeldung">
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Deine E-Mail Adresse..." />
          <label htmlFor="passwort">Passwort</label>
          <input type="text" id="passwort" name="passwort" placeholder="Dein Passwort..." />
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

export default Login;
