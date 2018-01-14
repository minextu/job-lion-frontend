import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestReport } from '../../_actions/report';

class Show extends Component {
  componentDidMount() {
    // fetch report if not cached
    if (!this.props.reports[this.props.reportId]) {
      this.props.dispatch(
        requestReport(this.props.reportId)
      );
    }
  }

  render() {
    const info = this.props.reports[this.props.reportId];

    let infoHtml = null;
    if (this.props.isFetching || !info) {
      infoHtml = <div className='loading'/>;
    }
    else if (this.props.errorCode) {
      infoHtml = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorCode}
        </div>
      );
    }
    else {
      infoHtml = (
        <div>
          <h1>{info.title}</h1>
          von {info.user.firstName} {info.user.lastName}

          <p>{info.text}</p>
        </div>
      );
    }

    return (
      <div className="ExperienceReport">
        {infoHtml}
      </div>
    );
  }
}

Show.propTypes = {
  reportId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorCode: PropTypes.string,
  reports: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    reports: state.report.reports,
    isFetching: state.report.isFetching,
    errorCode: state.report.errorCode,
    reportId: Number(ownProps.match.params.reportId)
  };
};

export default connect(mapStateToProps)(Show);
