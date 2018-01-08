import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Suche extends Component {
  render() {
    return (
      <footer>
        <ul id="footerList">
          <li><Link to="/">Startseit</Link></li>
          <li><Link to="/Impressum">Impressum</Link></li>
          <li><Link to="/Anmeldung">Anmelden</Link></li>
          <li><Link to="/Datenschutz">Datenschutz</Link></li>
          <li><Link to="/Haftungsausschluss">Haftungsausschluss</Link></li>
        </ul>
        <p>&#169; Job &bull; Lion</p>
      </footer>
    );
  }
}

export default Suche;
