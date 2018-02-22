import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategorySelect from '../../components/CategorySelect';
import { createReport } from '../../_actions/report';

class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', text: '', selectedCategories: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { title, text, selectedCategories } = this.state;
    this.props.dispatch(
      createReport(title, text, selectedCategories)
    );
    e.preventDefault();
  }

  render() {
    const { isCreating, errorCode } = this.props;

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

          <CategorySelect required createable
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
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.report.errorCodeCreate,
    isCreating: state.report.isCreating,
  };
};

export default connect(mapStateToProps)(AddReport);
