import api from '../ApiClient';

export function fetchCompaniesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().company;
    const companies = state.companies;

    if (companies.length === 0 && !state.isFetching) {
      dispatch(fetchCompanies());
    }
  };
}

function fetchCompanies() {
  return {
    type: 'FETCH_COMPANIES',
    payload: _sendFetchCompanyRequest()
  };
}

function _sendFetchCompanyRequest() {
  return api.get("v1/companies/")
    .then(json => ({ companies: json.companies }));
}
