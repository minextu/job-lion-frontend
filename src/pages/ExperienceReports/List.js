import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { connect } from 'react-redux';

import { fetchReportsIfNeeded } from '../../_actions/report';
import './List.css';

class List extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchReportsIfNeeded(this.props.categoryId)
    );
  }

  componentDidUpdate(prevProps) {
    // request reports if a new category was selected
    if (this.props.categoryId !== prevProps.categoryId) {
      this.props.dispatch(
        fetchReportsIfNeeded(this.props.categoryId)
      );
    }
  }

  render() {
    const { reports, categoryId, isFetching } = this.props;
    let reportList = null;

    if (reports[categoryId]) {
      reportList = reports[categoryId].map((report, idx) => (
        <div key={idx} className="card">
          <div className="card-body">
            <h5 className="card-title mb-2 text-muted">
              <Link to={"/Erfahrungsbericht/" + report.id}>{report.title}</Link>
            </h5>
            <p className="card-text">{report.text}</p>
          </div>
        </div>
      ));
    }

    return (
      <div className="ExperienceReportList">
        <h1>Erfahrungsberichte</h1>

        <Categories active={categoryId}/>

        <div id='reportList'>
          { isFetching
            && <div className='loading'/>
          }
          {reportList}
        </div>

      </div>
    );
  }
}

List.propTypes = {
  categoryId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  reports: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    reports: state.report.reportsByCategory,
    isFetching: state.report.isFetching,
    categoryId: Number(ownProps.match.params.categoryId)
  };
};

export default connect(mapStateToProps)(List);
