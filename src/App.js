import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

import Home from './pages/Home/Home';
import Kategorien from './pages/Kategorien/Kategorien';
import Erfahrungsberichte from './pages/Erfahrungsberichte/Erfahrungsberichte';
import Impressum from './pages/Impressum/Impressum';
import Anmeldung from './pages/Anmeldung/Anmeldung';
import Datenschutz from './pages/Datenschutz/Datenschutz';
import Haftungsausschluss from './pages/Haftungsausschluss/Haftungsausschluss';
import NotFound from './pages/NotFound/NotFound';

import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="parallax" />
        <main>
          <div id ="leiste" />

          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Kategorien' component={Kategorien}/>
            <Route exact path='/Erfahrungsberichte' component={Erfahrungsberichte}/>
            <Route exact path='/Impressum' component={Impressum}/>
            <Route exact path='/Anmeldung' component={Anmeldung}/>
            <Route exact path='/Datenschutz' component={Datenschutz}/>
            <Route exact path='/Haftungsausschluss' component={Haftungsausschluss}/>
            <Route path="*" component={NotFound} />
          </Switch>

        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
