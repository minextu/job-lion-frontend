import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { connect } from 'react-redux';

import { requestReports } from '../../_actions/report';
import './List.css';

class List extends Component {
  componentDidMount() {
    // request reports if not already cached
    if (!this.props.reports[this.props.categoryId]) {
      this.props.dispatch(
        requestReports(this.props.categoryId)
      );
    }
  }

  componentDidUpdate(prevProps) {
    // request reports if not already cached
    if (this.props.categoryId !== prevProps.categoryId
      && !this.props.reports[this.props.categoryId]) {
      this.props.dispatch(
        requestReports(this.props.categoryId)
      );
    }
  }

  render() {
    let reportList = null;
    if (this.props.reports[this.props.categoryId]) {
      reportList = this.props.reports[this.props.categoryId].map((report, idx) => (
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

        <Categories active={this.props.categoryId}/>

        <div id='reportList'>
          { this.props.isFetching
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
