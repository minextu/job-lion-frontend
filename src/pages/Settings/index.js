import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavLink from '../../components/NavLink';

import Profile from './Profile';
import Password from './Password';
import NotFound from '../NotFound';
import { Categories } from './Admin';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        { title: 'Profil', path: 'Profil', component: Profile },
        { title: 'Passwort', path: 'Passwort', component: Password }
      ],
      adminLinks: [
        { title: 'Kategorien bearbeiten', path: 'Admin/Kategorien', component: Categories },
      ]
    };
  }

  render() {
    const { match, isAdmin } = this.props;
    const { links, adminLinks } = this.state;

    return (
      <div>
        <h1>Einstellungen</h1>
        <div className="row no-gutter">
          <div className="col mb-4">
            <div className="card">
              <div className="card-header">Einstellungen</div>
              <ul className="nav nav-pills flex-column">
                {links.map((link, idx) => (
                  <NavLink key={idx} to={`${match.path}/${link.path}`}>
                    {link.title}
                  </NavLink>
                ))}
              </ul>
            </div>
            { isAdmin
              && <div className="card mt-4">
                <div className="card-header">Admin</div>
                <ul className="nav nav-pills flex-column">
                  {adminLinks.map((link, idx) => (
                    <NavLink key={idx} to={`${match.path}/${link.path}`}>
                      {link.title}
                    </NavLink>
                  ))}
                </ul>
              </div>
            }
          </div>
          <div className="col-lg-10">
            <Switch>
              <Redirect exact from={`${match.path}`} to={`${match.path}/Profil`} />
              {links.concat(adminLinks).map((link, idx) => (
                <Route key={idx} exact path={`${match.path}/${link.path}`} component={link.component}/>
              ))}

              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  match: PropTypes.object,
  isAdmin: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.login.isAdmin
  };
};

export default connect(mapStateToProps)(Settings);
