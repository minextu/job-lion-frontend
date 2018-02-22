import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategoriesIfNeeded } from '../_actions/category';
import Select from 'react-select';
import './CategorySelect.css';

class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategories: '' };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchCategoriesIfNeeded()
    );
  }

  onChange(selectedCategories) {
    this.setState({ selectedCategories });
    this.props.onChange(selectedCategories);
  }

  render() {
    const { categories, isFetching } = this.props;
    const { createable, required, disabled } = this.props;
    const { selectedCategories } = this.state;

    let SelectComponent = Select;
    if (createable) { SelectComponent = Select.Creatable; }

    return (
      <SelectComponent required={required} multi={true} disabled={disabled}
        value={selectedCategories}
        newOptionCreator={(category) => ({ label: category.label, value: category.label, create: true })}
        options={categories.map(category => {
          return {
            create: false,
            value: category.id,
            label: category.name };
        })}
        onChange={this.onChange}
        isLoading={isFetching}
        clearAllText="Alle löschen"
        placeholder="Kategorien auswählen..."
        noResultsText="Keine Suchergebnisse"
        promptTextCreator={(label) => (`Kategorie "${label}" hinzufügen`)}
      />
    );
  }
}

CategorySelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorCode: PropTypes.string,
  categories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  createable: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.category.errorCode,
    categories: state.category.categories,
    isFetching: state.category.isFetching
  };
};

export default connect(mapStateToProps)(CategorySelect);
