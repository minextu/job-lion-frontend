import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createReport } from '../../_actions/report';

class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', text: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { title, text } = this.state;
    this.props.dispatch(
      createReport(title, text)
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
            type="text"
            id="title"
            className="jb-input"
            placeholder="Titel hinzufügen..."
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <br/>
          <label htmlFor="categories">Kategorien</label>
          <br/><Link to="/Kategorien">Kategorie hinzufügen</Link><br/>

          <label htmlFor="text">Erfahrungsbericht</label><br/>
          <textarea
            name="text"
            rows="10"
            cols="100"
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
  isCreating: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    errorCode: state.report.errorCodeCreate,
    isCreating: state.report.isCreating
  };
};

export default connect(mapStateToProps)(AddReport);
