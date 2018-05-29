import React, { Component } from 'react';
import AlertBox from '../../components/AlertBox';

class Password extends Component {
  render() {
    let messageCode = "NotImplemented";

    return (
      <div className="card">
        <div className="card-header">
        Passwort
        </div>
        <div className="card-body">

          <AlertBox messageCode={messageCode}/>

          <h5 className="card-title">Passwort ändern</h5>
          <div className="card-text container-fluid">

            <div className="form-group">
              <label htmlFor="oldPassword">Altes Passwort</label>
              <input type="password" className="form-control" id="oldPassword"/>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Neues Passwort</label>
              <input type="password" className="form-control" id="newPassword"/>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword2">Neues Passwort wiederholen</label>
              <input type="password" className="form-control" id="newPassword2"/>
            </div>

            <button className="btn btn-primary">Passwort ändern</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Password;
