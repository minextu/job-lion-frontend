import React, { Component } from 'react';

class PasswortVergessen extends Component {
  render() {
    return (
      <div className="PasswortVergessen">
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Deine E-Mail Adresse..."/>
          <input type="submit" value="Passwort per Email zuschicken"/>
        </form>
      </div>
    );
  }
}

export default PasswortVergessen;
