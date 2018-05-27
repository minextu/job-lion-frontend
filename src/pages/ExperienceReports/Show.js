import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertBox from '../../components/AlertBox';

import { fetchReportIfNeeded, deleteReport } from '../../_actions/report';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = { isDelete: false };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchReportIfNeeded(this.props.reportId)
    );
  }

  onDelete() {
    const { reportId } = this.props;
    if (window.confirm('Diesen Erfahrungsbericht wirklich löschen?')) {
      this.setState({ isDelete: true });
      this.props.dispatch(
        deleteReport(reportId)
      );
    }
  }

  render() {
    const { reports, reportId, isFetching, isDeleting, errorCode, errorCodeDelete, isAdmin } = this.props;
    const info = reports[reportId];

    let infoHtml = null;
    if (isFetching) {
      infoHtml = <div className='loading'/>;
    }
    else if (errorCode) {
      infoHtml = (
        <AlertBox messageCode={errorCode} />
      );
    }
    else if (this.state.isDelete && !errorCodeDelete && !isDeleting) {
      infoHtml = (
        <div className="alert alert-success">Erfolgreich entfernt!</div>
      );
    }
    else if (!info) {
      infoHtml = (
        <AlertBox messageCode="NotFound" />
      );
    }
    else {
      infoHtml = (
        <div>
          <AlertBox messageCode={errorCodeDelete} />

          { isAdmin
          && <button
            onClick={() => this.onDelete()}
            className="btn btn-outline-danger float-sm-right"
          >
            Löschen
          </button>
          }

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
  isDeleting: PropTypes.bool.isRequired,
  errorCode: PropTypes.string,
  errorCodeDelete: PropTypes.string,
  reports: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    reports: state.report.reports,
    isFetching: state.report.isFetching,
    isDeleting: state.report.isDeleting,
    errorCode: state.report.errorCode,
    errorCodeDelete: state.report.errorCodeDelete,
    reportId: Number(ownProps.match.params.reportId),
    isAdmin: state.login.isAdmin
  };
};

export default connect(mapStateToProps)(Show);
