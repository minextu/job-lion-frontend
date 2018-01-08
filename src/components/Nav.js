import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    // TODO: icon onclick
    return (
      <nav className="topNav" id="myTopNav">
        <Link to="/">Startseite</Link>
        <Link to="/Kategorien">Kategorien</Link>
        <Link to="/Erfahrungsberichte">Erfahrungsberichte</Link>
        <Link to="/Impressum">Impressum</Link>
        <Link to="/Anmeldung">Anmeldung</Link>
        <a href="" className="icon">&#9776;</a>
      </nav>
    );
  }
}

export default Nav;
