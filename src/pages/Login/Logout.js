import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../_actions/login';

class Logout extends Component {
  componentWillMount() {
    const { dispatch, loggedIn } = this.props;

    // stop if not logged in
    if (!loggedIn) {
      this.alreadyLoggedOut = true;
    }
    // logout the user
    else {
      dispatch(logout());
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
