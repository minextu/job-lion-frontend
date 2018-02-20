import React, { Component } from 'react';
import './Main.css';

import Home from '../pages/Home/Home';
import ExperienceReportAdd from '../pages/ExperienceReports/AddReport';
import ExperienceReportList from '../pages/ExperienceReports/List';
import ExperienceReportShow from '../pages/ExperienceReports/Show';
import Impressum from '../pages/Impressum';
import { Login, Logout } from '../pages/Login';
import Register from '../pages/Register';
import PasswortVergessen from '../pages/PasswortVergessen';
import Datenschutz from '../pages/Datenschutz';
import Haftungsausschluss from '../pages/Haftungsausschluss';
import NotFound from '../pages/NotFound';

import { Switch, Route } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <main>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Erfahrungsberichte' component={ExperienceReportList}/>
          <Route exact path='/Erfahrungsberichte/Neu' component={ExperienceReportAdd}/>
          <Route exact path='/Erfahrungsbericht/:reportId' component={ExperienceReportShow}/>
          <Route exact path='/Impressum' component={Impressum}/>
          <Route exact path='/Anmelden' component={Login}/>
          <Route exact path='/Abmelden' component={Logout}/>
          <Route exact path='/Registrieren' component={Register}/>
          <Route exact path='/PasswortVergessen' component={PasswortVergessen}/>
          <Route exact path='/Datenschutz' component={Datenschutz}/>
          <Route exact path='/Haftungsausschluss' component={Haftungsausschluss}/>
          <Route path="*" component={NotFound} />
        </Switch>

      </main>
    );
  }
}

export default Main;
