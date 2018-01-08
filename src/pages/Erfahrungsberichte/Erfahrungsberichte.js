import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Erfahrungsberichte extends Component {
  render() {
    return (
      <div className="Erfahrungsberichte">
        <form action="">
          <label htmlFor="titel">Titel</label>
          <input type="text" id="titel" name="titel" placeholder="Titel hinzufügen..." /><br/>
          <label htmlFor="categories">Kategorien</label>
          <br/><Link to="/Kategorien">Kategorie hinzufügen</Link><br/>
          <label htmlFor="text">Erfahrungsbericht</label><br/>
          <textarea name="text" rows="10" cols="100"></textarea>
          <input type="submit" value="Hinzufügen" />
        </form>
      </div>
    );
  }
}

export default Erfahrungsberichte;
