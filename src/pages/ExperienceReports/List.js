import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { connect } from 'react-redux';

import { fetchReportsIfNeeded } from '../../_actions/report';
import SmoothCollapse from 'react-smooth-collapse';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, limit: 5 };
  }

  componentDidMount() {
    const { selectedCategories } = this.props;
    const { limit, page } = this.state;

    this.props.dispatch(
      fetchReportsIfNeeded(selectedCategories, limit, page)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // fetch reports if category or page selection changed
    const { selectedCategories } = this.props;
    const { limit, page } = this.state;

    if (prevProps.selectedCategories !== selectedCategories
    || prevState.page !== this.state.page) {
      // reset to page 1 if categories changed
      if (prevProps.selectedCategories !== selectedCategories) {
        this.setState({ page: 1 });
      }

      this.props.dispatch(
        fetchReportsIfNeeded(selectedCategories, limit, page)
      );
    }
  }

  renderPagination() {
    const { limit, page } = this.state;
    const { reportTotal } = this.props;

    const maxPage = Math.ceil(reportTotal / limit);

    // generate page list
    const pageNumbers = [];
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page">
        <ul className="pagination">

          <li className={page - 1 < 1 ? "page-item disabled" : "pageItem"}>
            <button className="page-link" onClick={() => this.setState({ page: page - 1 })}>Zurück</button>
          </li>

          { pageNumbers.map(p => (
            <li key={p} className={page === p ? "page-item active" : "page-item"}>
              <button className="page-link" onClick={() => this.setState({ page: p })}>{p}</button>
            </li>
          ))}

          <li className={page + 1 > maxPage ? "page-item disabled" : "pageItem"}>
            <button className="page-link" onClick={() => this.setState({ page: page + 1 })}>Weiter</button>
          </li>
        </ul>
      </nav>
    );
  }

  render() {
    const { reports, isFetching } = this.props;
    let reportEntries = null;

    if (reports) {
      reportEntries = reports.map((report, idx) => (
        <li key={idx} className="list-group-item">
          <Link to={"/Erfahrungsbericht/" + report.id}>
            {report.title}
          </Link>

          <span className="float-right">
            {new Date(report.created).toLocaleString()}
          </span>

          <ul>
            { report.jobCategories.map((category, idx) => (
              <li key={idx}>{category.name}</li>
            )
            )}
          </ul>
          <div style={{ marginTop: 10 + "px" }}>
            {report.user.firstName} {report.user.lastName}
          </div>
        </li>
      ));
    }

    return (
      <div className="ExperienceReportList">
        <h1>Erfahrungsberichte</h1>

        <div id='reportList' className="container-fluid">
          <div className="row">
            <div className="col" id='categoryRow'>
              <Categories />
            </div>
            <div className="col-lg-10">

              <div className='d-flex flex-wrap-reverse align-content-start justify-content-between'>
                {this.renderPagination()}
                { isFetching
                && <div className='loading'/>
                }
                <div id='reportAddBtn'>
                  <Link to='/Erfahrungsberichte/Neu' className="btn btn-primary">
                    Hinzufügen
                  </Link>
                </div>

              </div>

              <SmoothCollapse expanded={!isFetching}>
                <ul className="list-group">
                  {reportEntries}
                </ul>
              </SmoothCollapse>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  reports: PropTypes.array.isRequired,
  reportTotal: PropTypes.number,
  selectedCategories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    reports: state.report.reportList,
    reportTotal: state.report.reportListTotal,
    selectedCategories: state.report.selectedCategories,
    isFetching: state.report.isFetching
  };
};

export default connect(mapStateToProps)(List);
