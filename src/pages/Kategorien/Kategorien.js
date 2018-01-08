import React, { Component } from 'react';

class Kategorien extends Component {
  render() {
    return (
      <div className="Kategorien">
      				<form action="">

      					<label htmlFor="kategorie">Kategorie hinzufügen</label>
      					<input type="text" id="kategorie" name="kategorie" placeholder="Kategorie hinzufügen..." />

      					<input type="submit" value="Kategorie hinzufügen" />
      				</form>
      			</div>

    );
  }
}

export default Kategorien;
