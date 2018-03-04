import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactSelect from 'react-select';
import './Select.css';

class Select extends Component {
  render() {
    const { createable } = this.props;

    let SelectComponent = ReactSelect;
    if (createable) { SelectComponent = ReactSelect.Creatable; }

    return (
      <SelectComponent {...this.props}
        clearAllText="Alle löschen"
        noResultsText="Keine Suchergebnisse"
        promptTextCreator={(label) => (`"${label}" hinzufügen`)}
      />
    );
  }
}

Select.propTypes = {
  createable: PropTypes.bool
};

export default Select;
