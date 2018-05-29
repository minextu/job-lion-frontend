import api from '../ApiClient';
import history from '../history';

export function fetchReportListIfNeeded(jobCategoryIds, limit = 10, page = 1) {
  return (dispatch, getState) => {
    const state = getState().report;
    const reports = state.reportList;
    const offset = (page - 1) * limit;

    // check if reports for these categories where already fetched
    if ((reports.length === 0
        || state.fetchedCategories.sort().join(',') !== jobCategoryIds.sort().join(',')
        || state.reportOffset !== offset)
        && !state.isFetching) {
      dispatch(_fetchReportList(jobCategoryIds, limit, offset));
    }
  };
}

export function _fetchReportList(categoryIds, limit, offset) {
  return {
    type: 'FETCH_REPORT_LIST',
    payload: _sendFetchReportListRequest(categoryIds, limit, offset)
  };
}

export function fetchReportIfNeeded(reportId) {
  return (dispatch, getState) => {
    const state = getState().report;
    const report = state.reports[reportId];

    if (!report && !state.isFetching) {
      dispatch(fetchReport(reportId));
    }
  };
}

export function fetchReport(reportId) {
  return {
    type: 'FETCH_REPORT',
    meta: { reportId: reportId },
    payload: _sendFetchReportRequest(reportId)
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
      dispatch({
        type: 'CREATE_REPORT',
        payload: _sendCreateReportRequest(title, text, categories, company)
      });
    }
  };
}

export function deleteReport(reportId) {
  return {
    type: 'DELETE_REPORT',
    payload: _sendDeleteReportRequest(reportId)
  };
}

export function selectCategories(categories) {
  return {
    type: 'SELECT_CATEGORIES',
    categories,
  };
}

function _sendFetchReportListRequest(categoryIds, limit, offset) {
  let parameters = { limit: limit, offset: offset };
  // append selected categories
  if (categoryIds.length !== 0) {
    parameters.jobCategoryIds = categoryIds.toString();
  }

  return api.get(`v1/experienceReports/`, parameters)
    .then(json => ({
      reports: json.reports,
      categoryIds,
      total: Number(json.total),
      offset
    }));
}

function _sendFetchReportRequest(reportId) {
  return api.get(`v1/experienceReports/${reportId}`)
    .then(json => ({ report: json }));
}

async function _sendCreateReportRequest(title, text, categories, company) {
  // check job categories
  let jobCategoryIds = [];
  for (let key in categories) {
    let category = categories[key];

    // create this category if needed
    if (category.create) {
      await api.post(`v1/jobCategories/`, { name: category.value })
        .then(json => jobCategoryIds.push(json.id));
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
    await api.post(`v1/companies/`, { title: company.value })
      .then(json => {
        companyId = json.id;
      });
  }
  else if (company) {
    companyId = company.value;
  }

  // send report create request
  let parameters = { title, text, jobCategoryIds };
  if (companyId) {
    parameters.companyId = companyId;
  }

  return api.post(`v1/experienceReports/`, parameters)
    .then(json => {
      // redirect to the newly created report
      history.push('/Erfahrungsbericht/' + json.id);
      return;
    });
}

function _sendDeleteReportRequest(reportId) {
  return api.delete(`v1/experienceReports/${reportId}`)
    .then(() => ({ reportId }));
}
