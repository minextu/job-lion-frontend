import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../_actions/login';
import { Login } from '../pages/Login';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { tokenExpired: false };
  }

  // check if login token has expired
  componentWillMount() {
    const { loggedIn, expire, dispatch } = this.props;

    if (loggedIn && Date.now() / 1000 > expire) {
      dispatch(
        logout()
      );

      this.setState({ tokenExpired: true });
    }
  }

  renderRoute(routeProps, Component) {
    const { loggedIn } = this.props;
    const { tokenExpired } = this.state;

    if (loggedIn) {
      return (<Component {...routeProps} />);
    }
    else {
      return (<Login isPrompt expired={tokenExpired}/>);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest}
        render={routeProps => this.renderRoute(routeProps, Component)}
      />
    );
  }
}

PrivateRoute.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  expire: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    expire: state.login.expire
  };
};

export default connect(mapStateToProps)(PrivateRoute);
