import React, { Component } from 'react';

class Registrieren extends Component {
  render() {
    return (
      <div className="Registrieren">
        <form action="">
          <label htmlFor="fname">Vorname</label>
          <input type="text" id="fname" name="firstname" placeholder="Dein Vorname..."/>

          <label htmlFor="lname">Nachname</label>
          <input type="text" id="lname" name="lastname" placeholder="Dein Nachname..."/>

          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Deine E-Mail Adresse..."/>

          <label htmlFor="passwort">Passwort</label>
          <input type="text" id="passwort" name="passwort" placeholder="Dein Passwort..."/>

          <label htmlFor="passwort2">Passwort erneut eingeben</label>
          <input type="text" id="passwort2" name="passwort2" placeholder="Dein Passwort..."/>

          <input type="submit" value="Registrieren"/>
        </form>
      </div>
    );
  }
}

export default Registrieren;
