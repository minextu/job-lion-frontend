import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="topNav" id="myTopNav">
          <Link to="/">Startseite</Link>
          <Link to="/Kategorien">Kategorien</Link>
          <Link to="/Erfahrungsberichte">Erfahrungsberichte</Link>
          <Link to="/Impressum">Impressum</Link>
          <Link to="/Anmeldung">Anmeldung</Link>
          <a href="" className="icon">&#9776;</a>
        </nav>
      </header>
    );
  }
}

export default Header;
