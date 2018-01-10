import React, { Component } from 'react';
import './Main.css';

import Home from '../pages/Home/Home';
import Kategorien from '../pages/Kategorien/Kategorien';
import ExperienceReportOverview from '../pages/ExperienceReports/Overview';
import ExperienceReportList from '../pages/ExperienceReports/List';
import ExperienceReportShow from '../pages/ExperienceReports/Show';
import Impressum from '../pages/Impressum/Impressum';
import Login from '../pages/Login/Login';
import Registrieren from '../pages/Registrieren/Registrieren';
import PasswortVergessen from '../pages/PasswortVergessen/PasswortVergessen';
import Datenschutz from '../pages/Datenschutz/Datenschutz';
import Haftungsausschluss from '../pages/Haftungsausschluss/Haftungsausschluss';
import NotFound from '../pages/NotFound/NotFound';

import { Switch, Route } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <main>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Kategorien' component={Kategorien}/>
          <Route exact path='/Erfahrungsberichte' component={ExperienceReportOverview}/>
          <Route exact path='/Erfahrungsberichte/:categoryId' component={ExperienceReportList}/>
          <Route exact path='/Erfahrungsbericht/:reportId' component={ExperienceReportShow}/>
          <Route exact path='/Impressum' component={Impressum}/>
          <Route exact path='/Anmelden' component={Login}/>
          <Route exact path='/Registrieren' component={Registrieren}/>
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
