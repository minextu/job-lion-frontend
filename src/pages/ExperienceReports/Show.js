import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertBox from '../../components/AlertBox';

import { fetchReportIfNeeded } from '../../_actions/report';

class Show extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchReportIfNeeded(this.props.reportId)
    );
  }

  render() {
    const { reports, reportId, isFetching, errorCode } = this.props;
    const info = reports[reportId];

    let infoHtml = null;
    if (isFetching || !info) {
      infoHtml = <div className='loading'/>;
    }
    else if (errorCode) {
      infoHtml = (
        <AlertBox messageCode={errorCode} />
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
