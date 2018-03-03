import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategorySelect from '../../components/Select/CategorySelect';
import { showReportsByCategories } from '../../_actions/report';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { categories } = this.state;

    let selectedCategories = categories.map(category => {
      return category.value;
    });

    // search
    this.props.dispatch(
      showReportsByCategories(selectedCategories)
    );
  }

  render() {
    return (
      <div id="suche">
        <form onSubmit={this.handleSubmit}>
          <CategorySelect
            onChange={(categories) => this.setState({ categories })}
          />

          <input className="jb-input" type="submit" value="Nach Erfahrungen suchen" />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Search);
