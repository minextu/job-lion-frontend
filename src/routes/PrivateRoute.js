import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Login } from '../pages/Login';

class PrivateRoute extends Component {
  renderRoute(routeProps, Component) {
    const { loggedIn } = this.props;

    if (loggedIn) {
      return (<Component {...routeProps} />);
    }
    else {
      return (<Login isPrompt/>);
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
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
