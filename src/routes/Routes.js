import React, { Component } from 'react';

import Home from '../pages/Home/Home';
import ExperienceReportAdd from '../pages/ExperienceReports/AddReport';
import ExperienceReportList from '../pages/ExperienceReports/List';
import ExperienceReportShow from '../pages/ExperienceReports/Show';
import Impressum from '../pages/Impressum';
import { Login, Logout } from '../pages/Login';
import Register from '../pages/Register';
import PasswortVergessen from '../pages/PasswortVergessen';
import Activate from '../pages/Activate';
import Settings from '../pages/Settings';
import Datenschutz from '../pages/Datenschutz';
import Haftungsausschluss from '../pages/Haftungsausschluss';
import NotFound from '../pages/NotFound';

import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

class PublicRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/Erfahrungsberichte' component={ExperienceReportList}/>
        <PrivateRoute exact path='/Erfahrungsberichte/Neu' component={ExperienceReportAdd}/>
        <Route exact path='/Erfahrungsbericht/:reportId' component={ExperienceReportShow}/>
        <Route exact path='/Impressum' component={Impressum}/>
        <Route exact path='/Anmelden' component={Login}/>
        <Route exact path='/Abmelden' component={Logout}/>
        <Route exact path='/Registrieren' component={Register}/>
        <Route exact path='/PasswortVergessen' component={PasswortVergessen}/>
        <Route exact path='/Aktivieren/:userId' component={Activate}/>
        <PrivateRoute path='/Einstellungen' component={Settings}/>
        <Route exact path='/Datenschutz' component={Datenschutz}/>
        <Route exact path='/Haftungsausschluss' component={Haftungsausschluss}/>
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PublicRoutes;
