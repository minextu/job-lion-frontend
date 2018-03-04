import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCompaniesIfNeeded } from '../../_actions/company';
import Select from './Select';

class CompanySelect extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCompany: '' };

    this.onChange = this.onChange.bind(this);
    this.isOptionUnique = this.isOptionUnique.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchCompaniesIfNeeded()
    );
  }

  onChange(selectedCompany) {
    this.setState({ selectedCompany });
    this.props.onChange(selectedCompany);
  }

  isOptionUnique(o) {
    const { companies } = this.props;

    let value = o.option.value;
    let options = companies.map(option => { return option.title.toLowerCase(); });

    // don't allow empty companies
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
    const { companies, isFetching, createable, selected } = this.props;
    const { selectedCompany } = this.state;

    // initial selected options (if any)
    let value = selectedCompany;
    if (selected) {
      value = selected.map(id => {
        return {
          create: false,
          value: id,
          label: companies.find(c => (c.id === id)).title
        };
      });
    }

    return (
      <Select {...this.props}
        createable={createable}
        newOptionCreator={(company) => ({ label: company.label, value: company.label, create: true })}
        isOptionUnique={this.isOptionUnique}
        options={companies.map(company => {
          return {
            create: false,
            value: company.id,
            label: company.title };
        })}
        onChange={this.onChange}
        isLoading={isFetching}
        value={value}
        placeholder="Firma auswählen..."
      />
    );
  }
}

CompanySelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorCode: PropTypes.string,
  companies: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired,
  createable: PropTypes.bool,
  selected: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.company.errorCode,
    companies: state.company.companies,
    isFetching: state.company.isFetching
  };
};

export default connect(mapStateToProps)(CompanySelect);
