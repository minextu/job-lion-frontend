import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        { title: "Startseite", path: "/" },
        { title: "Impressum", path: "/Impressum" },
        { title: "Anmelden", path: "/Anmelden" },
        { title: "Datenschutz", path: "/Datenschutz" },
        { title: "Haftungsausschluss", path: "/Haftungsausschluss" },
      ]
    };
  }
  render() {
    return (
      <footer className="footer bg-dark p-3 text-secondary mt-auto">
        <ul className="list-unstyled">
          {this.state.links.map((link, idx) => (
            <li key={idx}><Link className="text-secondary" to={link.path}>
              {link.title}
            </Link></li>
          ))}
        </ul>
        &#169; Job &bull; Lion
      </footer>
    );
  }
}

export default Footer;
