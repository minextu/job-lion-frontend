import React, { Component } from 'react';
import './Suche.css';

class Suche extends Component {
  render() {
    return (
      <div id="suche">
        <form action="">
          <select id="Erfahrungen" name="Erfahrungen">
            <option value="Beispiel 1">Beispiel 1</option>
            <option value="Beispiel 2">Beispiel 2</option>
            <option value="Beispiel 3">Beispiel 3</option>
          </select>
          <input type="submit" value="Nach Erfahrungen suchen" />
        </form>
      </div>
    );
  }
}

export default Suche;
