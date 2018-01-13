import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../_actions/login';

class Logout extends Component {
  componentWillMount() {
    // stop if not logged in
    if (!this.props.loggedIn) {
      this.alreadyLoggedOut = true;
    }
    // logout the user
    else {
      this.props.dispatch(logout());
      this.alreadyLoggedOut = false;
    }
  }

  render() {
    if (this.alreadyLoggedOut) {
      return (
        <div className="alert alert-warning">Bereits ausgeloggt!</div>
      );
    }
    return (
      <div className="alert alert-success">Erfolgreich abgemeldet!</div>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps)(Logout);
