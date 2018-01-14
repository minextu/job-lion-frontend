import api from '../ApiClient';

export function requestReports(categoryId) {
  return _sendReportsRequest(categoryId);
}

export function requestReport(reportId) {
  return _sendReportRequest(reportId);
}

function _receiveReports(reports, categoryId) {
  return {
    type: 'RECEIVE_REPORTS',
    categoryId,
    reports
  };
}

function _requestReports(categoryId) {
  return {
    type: 'REQUEST_REPORTS',
    categoryId
  };
}

function _receiveReportsFailure(errorCode) {
  return {
    type: 'REQUEST_REPORTS_FAILURE',
    errorCode
  };
}

function _sendReportsRequest(categoryId) {
  return function (dispatch) {
    dispatch(_requestReports(categoryId));

    return api.get(`v1/experienceReports/?limit=10&jobCategoryId=${categoryId}`)
      .then(json => {
        if (json.error) {
          dispatch(_receiveReportsFailure(json.error));
        }
        else {
          dispatch(_receiveReports(json, categoryId));
        }
      });
  };
}

function _receiveReport(report, reportId) {
  return {
    type: 'RECEIVE_REPORT',
    reportId,
    report
  };
}

function _requestReport(reportId) {
  return {
    type: 'REQUEST_REPORT',
    reportId
  };
}

function _sendReportRequest(reportId) {
  return function (dispatch) {
    dispatch(_requestReport(reportId));

    return api.get(`v1/experienceReports/${reportId}`)
      .then(json => {
        if (json.error) {
          dispatch(_receiveReportsFailure(json.error));
        }
        else {
          dispatch(_receiveReport(json, reportId));
        }
      });
  };
}
