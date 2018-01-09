import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      categories: []
    };
  }

  render() {
    return (
      <div className="ExperienceReportOverview">
        <h1>Erfahrungsberichte</h1>

        <Categories/>

        <h3>Hinzufügen</h3>
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

export default Overview;
