import React from 'react';
import PropTypes from 'prop-types';

const AlertBox = ({
  messageCode
}) => {
  // translate message code
  let messages = {
    InvalidLogin: {
      text: "E-Mail oder Passwort falsch!",
      type: "danger"
    },
    LoginExpired: {
      text: "Login abgelaufen. Bitte erneut anmelden!",
      type: "warning"
    },
    LoginNeeded: {
      text: "Login benötigt!",
      type: "warning"
    },
    LoginSuccessful: {
      text: "Erfolgreich angemeldet!",
      type: "success"
    },
    AlreadyLoggedOut: {
      text: "Bereits abgemeldet!",
      type: "warning"
    },
    LogoutSuccessful: {
      text: "Erfolgreich abgemeldet!",
      type: "success"
    },
    RegisterSuccessful: {
      text: "Erfolgreich registriert! Eine Bestätigungsemail wurde gesendet.",
      type: "success"
    },
    PasswordsNotEqual: {
      text: "Passwörter stimmen nicht überein!",
      type: "danger"
    },
    EmailExists: {
      text: "Email ist bereits in Benutzung!",
      type: "danger"
    },
    InvalidPassword: {
      text: "Das Password ist ungeeignet!",
      type: "danger"
    }
  };

  let text;
  let type;

  if (messages[messageCode]) {
    text = messages[messageCode].text;
    type = messages[messageCode].type;
  }
  else if (messageCode) {
    text = `Unbekannter Fehler: ${messageCode}`;
    type = "warning";
  }

  // generate bootstrap alert box
  if (type) {
    type = "alert alert-" + type;
    return (
      <div className={type}>{text}</div>
    );
  }
  else { return null; }
};

AlertBox.propTypes = {
  messageCode: PropTypes.string,
};

export default AlertBox;
