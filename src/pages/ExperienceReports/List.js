import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      categoryId: this.props.match.params.categoryId,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchReports(this.state.categoryId);
  }

  componentWillReceiveProps(nextProps) {
    let newCategoryId = nextProps.match.params.categoryId;

    if (newCategoryId !== this.props.match.params.categoryId) {
      this.setState({
        categoryId: newCategoryId,
        isLoading: true,
        reports: [] });
      this.fetchReports(newCategoryId);
    }
  }

  fetchReports(categoryId) {
    fetch(`/api/v1/experienceReports/?limit=10&jobCategoryId=${categoryId}`)
      .then(res => res.json())
      .then(reports => this.setState({ reports, isLoading: false }));
  }

  render() {
    const reportList = this.state.reports.map((report, idx) => (
      <div key={idx} className="card">
        <div className="card-body">
          <h5 className="card-title mb-2 text-muted">
            <Link to={"/Erfahrungsbericht/" + report.id}>{report.title}</Link>
          </h5>
          <p className="card-text">{report.text}</p>
        </div>
      </div>
    ));

    return (
      <div className="ExperienceReportList">
        <h1>Erfahrungsberichte</h1>

        <Categories active={this.state.categoryId}/>

        <div id='categoryList'>
          { this.state.isLoading
            && <div className='loading'/>
          }
          {reportList}
        </div>

      </div>
    );
  }
}

List.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default List;
