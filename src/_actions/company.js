import api from '../ApiClient';

export function fetchCompaniesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().company;
    const companies = state.companies;

    if (companies.length === 0 && !state.isFetching) {
      dispatch(_sendCompanyRequest());
    }
  };
}

function _receiveCompanies(companies) {
  return {
    type: 'RECEIVE_COMPANIES',
    companies
  };
}

function _requestCompanies() {
  return {
    type: 'REQUEST_COMPANIES',
  };
}

function _receiveCompaniesFailure(errorCode) {
  return {
    type: 'REQUEST_COMPANIES_FAILURE',
    errorCode
  };
}

function _sendCompanyRequest() {
  return function (dispatch) {
    dispatch(_requestCompanies());

    return api.get("v1/companies/")
      .then(json => {
        if (json.error) {
          dispatch(_receiveCompaniesFailure(json.error));
        }
        else {
          dispatch(_receiveCompanies(json.companies));
        }
      });
  };
}
