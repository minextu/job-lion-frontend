import api from '../ApiClient';
import history from '../history';

export function fetchReportsIfNeeded(jobCategoryIds, limit = 10, page = 1) {
  return (dispatch, getState) => {
    const state = getState().report;
    const reports = state.reportList;
    const offset = (page - 1) * limit;

    // check if reports for these categories where already fetched
    if ((reports.length === 0
        || state.fetchedCategories.sort().join(',') !== jobCategoryIds.sort().join(',')
        || state.reportOffset !== offset)
        && !state.isFetching) {
      dispatch(_sendReportsRequest(jobCategoryIds, limit, offset));
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

export function showReportsByCategories(categoryIds) {
  return dispatch => {
    history.push('/Erfahrungsberichte');
    dispatch(
      selectCategories(categoryIds)
    );
  };
}

export function createReport(title, text, categories, company) {
  return (dispatch, getState) => {
    const state = getState().report;
    if (!state.isCreating) {
      dispatch(_sendCreateReportRequest(title, text, categories, company));
    }
  };
}

export function selectCategories(categories) {
  return {
    type: 'SELECT_CATEGORIES',
    categories,
  };
}

function _receiveReports(reports, categoryIds, total, offset) {
  return {
    type: 'RECEIVE_REPORTS',
    categoryIds,
    total,
    offset,
    reports
  };
}

function _requestReports(categoryIds) {
  return {
    type: 'REQUEST_REPORTS',
    categoryIds
  };
}

function _receiveReportsFailure(errorCode) {
  return {
    type: 'REQUEST_REPORTS_FAILURE',
    errorCode
  };
}

function _sendReportsRequest(categoryIds, limit, offset) {
  return function (dispatch) {
    dispatch(_requestReports(categoryIds));

    let parameters = { limit: limit, offset: offset };
    // append selected categories
    if (categoryIds.length !== 0) {
      parameters.jobCategoryIds = categoryIds.toString();
    }

    return api.get(`v1/experienceReports/`, parameters)
      .then(json => {
        if (json.error) {
          dispatch(_receiveReportsFailure(json.error));
        }
        else {
          dispatch(_receiveReports(json.reports, categoryIds, Number(json.total), offset));
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

function _createReportSuccess(id) {
  history.push('/Erfahrungsbericht/' + id);
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

function _sendCreateReportRequest(title, text, categories, company) {
  return async function (dispatch) {
    dispatch(_requestCreateReport());

    // check job categories
    let jobCategoryIds = [];
    for (let key in categories) {
      let category = categories[key];

      // create this category if needed
      if (category.create) {
        await api.post(`v1/jobCategories/`, { name: category.value }, true)
          .then(json => {
            if (json.error) {
              dispatch(_createReportFailure(json.error));
            }
            else {
              jobCategoryIds.push(json.id);
            }
          });
      }
      // if it does already exist, just add it to the array
      else {
        jobCategoryIds.push(category.value);
      }
    }

    // check company
    let companyId;

    // create this company if needed
    if (company && company.create) {
      await api.post(`v1/companies/`, { title: company.value }, true)
        .then(json => {
          if (json.error) {
            dispatch(_createReportFailure(json.error));
          }
          else {
            companyId = json.id;
          }
        });
    }
    else if (company) {
      companyId = company.value;
    }

    // send report create request
    return api.post(`v1/experienceReports/`, { title, text, jobCategoryIds, companyId }, true)
      .then(json => {
        if (json.error) {
          dispatch(_createReportFailure(json.error));
        }
        else {
          dispatch(_createReportSuccess(json.id));
        }
      });
  };
}
