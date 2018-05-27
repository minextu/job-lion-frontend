import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends Component {
  render() {
    const { to, children, location, ...rest } = this.props;
    return (
      <Route path={to} location={location}>
        {
          ({ match }) => {
            const liClassName = match ? 'nav-item active' : 'nav-item';
            const linkClassName = match ? 'nav-link active' : 'nav-link';

            return (
              <li className={liClassName} {...rest}>
                <Link className={linkClassName} to={to}>{children}</Link>
              </li>
            );
          }
        }
      </Route>
    );
  }
}

NavLink.propTypes = {
  to: Link.propTypes.to,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default NavLink;
