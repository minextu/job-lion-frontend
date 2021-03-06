import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategoriesIfNeeded } from '../../_actions/category';
import Select from './Select';

class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategories: '' };

    this.onChange = this.onChange.bind(this);
    this.isOptionUnique = this.isOptionUnique.bind(this);
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

  isOptionUnique(o) {
    const { categories } = this.props;

    let value = o.option.value;
    let options = categories.map(option => { return option.name.toLowerCase(); });

    // don't allow empty categories
    if (!value.trim()) {
      return false;
    }
    // don't allow duplicates
    if (options.indexOf(value.toLowerCase()) !== -1) {
      return false;
    }

    return true;
  }

  render() {
    const { categories, isFetching, createable, selected } = this.props;
    const { selectedCategories } = this.state;

    // initial selected options (if any)
    let value = selectedCategories;
    if (selected) {
      value = selected.map(id => {
        return {
          create: false,
          value: id,
          label: categories.find(c => (c.id === id)).name
        };
      });
    }

    return (
      <Select {...this.props}
        multi={true} createable={createable}
        newOptionCreator={(category) => ({ label: category.label, value: category.label, create: true })}
        isOptionUnique={this.isOptionUnique}
        options={categories.map(category => {
          return {
            create: false,
            value: category.id,
            label: category.name };
        })}
        onChange={this.onChange}
        isLoading={isFetching}
        value={value}
        placeholder="Kategorien auswählen..."
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
  createable: PropTypes.bool,
  selected: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.category.errorCode,
    categories: state.category.categories,
    isFetching: state.category.isFetching
  };
};

export default connect(mapStateToProps)(CategorySelect);
