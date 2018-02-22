import React, { Component } from 'react';
import netzwerk150 from './images/Netzwerk150.png';
import austausch150 from './images/Austausch150.png';
import lion150 from './images/Lion150.png';
import './Home.css';
import Search from './Search';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="parallax" />
        <div id ="leiste" />

        <Search />

        <div className="container" id="bulletPoint">
          <div className="row">
            <div className="col-md-4">
              <img src={netzwerk150} alt="netzwerk" width="250em" height="250em" />
              <h3>Profitiere von einem großen Netzwerk</h3>
              <p>Auf JobLion erhältst du Zugriff auf eine einzigartige Datenbank mit echten Erfahrungsberichten.</p>
            </div>
            <div className="col-md-4">
              <img src={austausch150} alt="austausch" width="250em" height="250em" />
              <h3>Tausche dich mit Gleichgesinnten aus</h3>
              <p>Du hast Fragen die dich brennend interessieren und suchst authentische Antworten? Unsere erfahrene Löwen-Community hilft dir dabei.</p>
            </div>
            <div className="col-md-4">
              <img src={lion150} alt="lion" width="250em" height="250em" />
              <h3>Werde selbst Erfahrungs-Löwe</h3>
              <p>Du kannst dich noch gut daran erinnern wie es ist beruflich nicht weiter zu wissen. Werde zum Erfahrungs-Löwen und teile deine persönlichen Erfahrungen.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
