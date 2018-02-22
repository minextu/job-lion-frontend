import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectCategories } from '../../_actions/report';
import CategorySelect from '../../components/CategorySelect';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { activeCategoryFilter: 'all', selectedCategories: [] };

    this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    // reset categories
    this.props.dispatch(
      selectCategories([])
    );
  }

  handleCategoryFilterChange(e) {
    // save state
    this.setState({
      activeCategoryFilter: e.target.value
    });

    // send new categories action (empty array if all categories is selected)
    const categories = e.target.value === "custom" ? this.state.selectedCategories : [];
    this.props.dispatch(
      selectCategories(categories)
    );
  }

  handleCategoryChange(categories) {
    let newSelectedCategories = categories.map(category => {
      return category.value;
    });

    // save state
    this.setState({
      selectedCategories: newSelectedCategories
    });

    // send new categories action
    this.props.dispatch(
      selectCategories(newSelectedCategories)
    );
  }

  renderCategoryFilter() {
    const { activeCategoryFilter } = this.state;

    return (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="all_categories"
            value="all"
            checked={activeCategoryFilter === "all"}
            onChange={this.handleCategoryFilterChange}
          />
          <label className="form-check-label" htmlFor="all_categories">
          Alle
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            name="categoryFilter"
            type="radio"
            id="custom_categories"
            value="custom"
            checked={activeCategoryFilter === "custom"}
            onChange={this.handleCategoryFilterChange}
          />
          <label className="form-check-label" htmlFor="custom_categories">
          Auswahl
          </label>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>Kategorien</h3>
        {this.renderCategoryFilter()}
        <div style={{ marginTop: 10 + 'px' }}>
          <CategorySelect
            disabled={this.state.activeCategoryFilter === "all"}
            onChange={this.handleCategoryChange}/>
        </div>

      </div>
    );
  }
}

Categories.propTypes = {
  active: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Categories);
