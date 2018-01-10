import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navLinks: [
        { title: "Kategorien", path: "/Kategorien" },
        { title: "Erfahrungsberichte", path: "/Erfahrungsberichte" },
        { title: "Impressum", path: "/Impressum" },
        { title: "Anmelden", path: "/Anmelden" }
      ]
    };
  }
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark topNav">
          <Link className="navbar-brand" to="/">Job &bull; Lion</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavContent" aria-controls="topNavContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id='topNavContent'>
            <div className="navbar-nav mr-auto">

              {this.state.navLinks.map((link, idx) => (
                <li key={idx} data-toggle="collapse" data-target=".navbar-collapse.show">
                  <Link className="nav-item nav-link" to={link.path}>{link.title}</Link>
                </li>
              ))}

            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
