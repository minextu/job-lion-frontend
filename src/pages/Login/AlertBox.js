import React from 'react';
import PropTypes from 'prop-types';

const AlertBox = ({
  errorCode,
  loggedIn
}) => {
  if (errorCode) {
    let errorText;

    switch (errorCode) {
    case "InvalidLogin":
      errorText = "E-Mail oder Passwort falsch!";
      break;
    default:
      errorText = errorCode;
    }

    return (
      <div className="alert alert-danger">{errorText}</div>
    );
  }
  else if (loggedIn) {
    return (
      <div className="alert alert-success">Erfolgreich angemeldet!</div>
    );
  }
  else { return null; }
};

AlertBox.propTypes = {
  errorCode: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired
};

export default AlertBox;
