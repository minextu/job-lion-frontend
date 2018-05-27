import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlertBox from '../../components/AlertBox';
import { logout } from '../../_actions/login';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { alreadyLoggedOut: false };
  }

  componentDidMount() {
    const { dispatch, loggedIn } = this.props;

    // stop if not logged in
    if (!loggedIn) {
      this.setState({ alreadyLoggedOut: true });
    }
    // logout the user
    else {
      dispatch(logout());
    }
  }

  render() {
    let messageCode;

    if (this.state.alreadyLoggedOut) {
      messageCode = "AlreadyLoggedOut";
    }
    else {
      messageCode = "LogoutSuccessful";
    }

    return (
      <AlertBox messageCode={messageCode}/>
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
