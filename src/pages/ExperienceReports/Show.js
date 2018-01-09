import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [],
      reportId: this.props.match.params.reportId,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchReport(this.state.reportId);
  }

  componentWillReceiveProps(nextProps) {
    let newReportId = nextProps.match.params.reportId;

    if (newReportId !== this.props.match.params.reportId) {
      this.setState({
        reportId: newReportId,
        isLoading: true,
        info: [] });
      this.fetchReport(newReportId);
    }
  }

  fetchReport(reportId) {
    fetch(`/api/v1/experienceReports/${reportId}`)
      .then(res => res.json())
      .then(info => this.setState({ info, isLoading: false }));
  }

  render() {
    const info = this.state.info;

    let infoHtml = null;
    if (this.state.isLoading) {
      infoHtml = <div className='loading'/>;
    }
    else if (info.error === "NotFound") {
      infoHtml = (
        <div className="alert alert-danger" role="alert">
        Erfahrungsbericht nicht gefunden!
        </div>
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
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default Show;
