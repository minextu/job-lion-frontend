import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLink from '../NavLink';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navLinks: [
        { title: "Erfahrungsberichte", path: "/Erfahrungsberichte" },
        { title: "Impressum", path: "/Impressum" }
      ],
      loginLinks: [
        { title: "Anmelden", path: "/Anmelden", icon: "sign-in" }
      ],
      loggedInLinks: [
        { title: "Einstellungen", path: "/Einstellungen", icon: "cog" },
        { title: "Abmelden", path: "/Abmelden", icon: "sign-out" }
      ]
    };
  }
  render() {
    let rightNavLinks = this.state.loginLinks;
    if (this.props.loggedIn) {
      rightNavLinks = this.state.loggedInLinks;
    }

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark topNav">
          <Link className="navbar-brand" to="/">Job &bull; Lion</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavContent" aria-controls="topNavContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id='topNavContent'>
            <div className="navbar-nav mr-auto">

              {this.state.navLinks.map((link, idx) => (
                <NavLink
                  key={idx}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  to={link.path}
                >
                  {link.title}
                </NavLink>
              ))}

            </div>

            <div className="navbar-nav ml-auto">

              {rightNavLinks.map((link, idx) => (
                <NavLink
                  key={idx}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  to={link.path}
                >
                  { link.icon
                      && <FontAwesome name={link.icon}/>
                  }
                  &nbsp;
                  {link.title}
                </NavLink>
              ))}

            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  };
};

export default connect(mapStateToProps)(Header);
