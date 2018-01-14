import api from '../ApiClient';

export function fetchReportsIfNeeded(jobCategoryId) {
  return (dispatch, getState) => {
    const state = getState().report;
    const reports = state.reportsByCategory[jobCategoryId];

    if (!reports && !state.isFetching) {
      dispatch(_sendReportsRequest(jobCategoryId));
    }
  };
}

export function fetchReportIfNeeded(reportId) {
  return (dispatch, getState) => {
    const state = getState().report;
    const report = state.reports[reportId];

    if (!report && !state.isFetching) {
      dispatch(_sendReportRequest(reportId));
    }
  };
}

export function createReport(title, text) {
  return (dispatch, getState) => {
    const state = getState().report;
    if (!state.isCreating) {
      dispatch(_sendCreateReportRequest(title, text));
    }
  };
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

function _receiveReportFailure(errorCode) {
  return {
    type: 'REQUEST_REPORT_FAILURE',
    errorCode
  };
}

function _sendReportRequest(reportId) {
  return function (dispatch) {
    dispatch(_requestReport(reportId));

    return api.get(`v1/experienceReports/${reportId}`)
      .then(json => {
        if (json.error) {
          dispatch(_receiveReportFailure(json.error));
        }
        else {
          dispatch(_receiveReport(json, reportId));
        }
      });
  };
}

function _createReportSuccess() {
  return {
    type: 'CREATE_REPORT_SUCCESS',
  };
}

function _requestCreateReport() {
  return {
    type: 'REQUEST_CREATE_REPORT'
  };
}

function _createReportFailure(errorCode) {
  return {
    type: 'CREATE_REPORT_FAILURE',
    errorCode
  };
}

function _sendCreateReportRequest(title, text) {
  return function (dispatch) {
    dispatch(_requestCreateReport());

    return api.post(`v1/experienceReports/`, { title, text }, true)
      .then(json => {
        if (json.error) {
          dispatch(_createReportFailure(json.error));
        }
        else {
          dispatch(_createReportSuccess());
        }
      });
  };
}
