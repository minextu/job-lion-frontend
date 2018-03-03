import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectCategories } from '../../_actions/report';
import CategorySelect from '../../components/Select/CategorySelect';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { activeCategoryFilter: 'all' };

    this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryFilterChange(e) {
    // save state
    this.setState({
      activeCategoryFilter: e.target.value
    });

    // send new categories action (empty array if all categories is selected)
    const categories = e.target.value === "custom" ? this.props.selectedCategories : [];
    this.props.dispatch(
      selectCategories(categories)
    );
  }

  handleCategoryChange(categories) {
    let newSelectedCategories = categories.map(category => {
      return category.value;
    });

    // send new categories action
    this.props.dispatch(
      selectCategories(newSelectedCategories)
    );
  }

  renderCategoryFilter() {
    const { activeCategoryFilter } = this.state;
    const { selectedCategories } = this.props;

    return (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="all_categories"
            value="all"
            checked={activeCategoryFilter === "all" && selectedCategories.length === 0}
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
            checked={activeCategoryFilter === "custom" || selectedCategories.length !== 0}
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
    const { selectedCategories } = this.props;

    return (
      <div>
        <h3>Kategorien</h3>
        {this.renderCategoryFilter()}
        <div style={{ marginTop: 10 + 'px' }}>
          <CategorySelect
            disabled={this.state.activeCategoryFilter === "all" && selectedCategories.length === 0}
            onChange={this.handleCategoryChange}
            selected={selectedCategories}
          />
        </div>

      </div>
    );
  }
}

Categories.propTypes = {
  active: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    selectedCategories: state.report.selectedCategories
  };
};

export default connect(mapStateToProps)(Categories);
