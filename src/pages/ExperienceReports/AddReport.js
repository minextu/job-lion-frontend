import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select';

import './AddReport.css';
import { fetchCategoriesIfNeeded } from '../../_actions/category';
import { createReport } from '../../_actions/report';

class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', text: '', selectedCategories: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchCategoriesIfNeeded()
    );
  }

  handleSubmit(e) {
    const { title, text, selectedCategories } = this.state;
    this.props.dispatch(
      createReport(title, text, selectedCategories)
    );
    e.preventDefault();
  }

  render() {
    const { isCreating, errorCode, categories } = this.props;
    const { selectedCategories } = this.state;

    return (
      <div id='AddReport'>
        <h1>Erfahrungsbericht Hinzufügen</h1>

        { isCreating
          && <span className='inline-loading'/>
        }

        { errorCode
          && <div className='alert alert-danger'>{errorCode}</div>
        }

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Titel</label>
          <input
            required
            type="text"
            className="jb-input"
            placeholder="Titel hinzufügen..."
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <br/>

          <label>Kategorien</label>

          <Select.Creatable
            required
            className="categorySelect"
            name="categories"
            value={selectedCategories}
            multi={true}
            newOptionCreator={(category) => ({ label: category.label, value: category.label, create: true })}
            clearAllText="Alle löschen"
            placeholder="Kategorien hinzufügen..."
            promptTextCreator={(label) => (`Kategorie "${label}" hinzufügen`)}
            options={categories.map(category => {
              return {
                create: false,
                value: category.id,
                label: category.name };
            })}
            onChange={(selectedCategories) => this.setState({ selectedCategories })}
          />
          <br/>

          <label htmlFor="text">Erfahrungsbericht</label><br/>
          <textarea className="jb-input"
            required
            name="text"
            rows="10"
            onChange={(e) => this.setState({ text: e.target.value })}
          ></textarea>
          <input className="jb-input" type="submit" value="Hinzufügen" />
        </form>
      </div>
    );
  }
}

AddReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorCode: PropTypes.string,
  isCreating: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.report.errorCodeCreate,
    isCreating: state.report.isCreating,
    categories: state.category.categories,
  };
};

export default connect(mapStateToProps)(AddReport);
