import React, { Component } from 'react';

class Kategorien extends Component {
  render() {
    return (
      <div className="Kategorien">
        <form action="">

          <label htmlFor="kategorie">Kategorie hinzufügen</label>
          <input className="jb-input" type="text" id="kategorie" placeholder="Kategorie hinzufügen..." />

          <input className="jb-input" type="submit" value="Kategorie hinzufügen" />
        </form>
      </div>
    );
  }
}

export default Kategorien;
