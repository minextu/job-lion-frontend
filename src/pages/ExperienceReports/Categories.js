import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Categories.css';
import { fetchCategoriesIfNeeded } from '../../_actions/category';
import { selectCategories } from '../../_actions/report';

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

    this.props.dispatch(
      fetchCategoriesIfNeeded()
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

  handleCategoryChange(e) {
    const id = Number(e.target.id.replace('category_', ''));
    const checked = e.target.checked;

    let newSelectedCategories = this.state.selectedCategories.slice();

    // add category to id if checked
    if (checked) {
      newSelectedCategories.push(id);
    }
    // remove from array if unchecked
    else {
      const index = newSelectedCategories.indexOf(id);
      newSelectedCategories.splice(index, 1);
    }

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

  renderCategories() {
    const { categories } = this.props;

    const categoriesHtml = categories.map((category, idx) => {
      const id = "category_" + category.id;

      return (
        <div className="form-check" key={idx}>
          <input
            className="form-check-input"
            type="checkbox"
            id={id}
            checked={this.state.selectedCategories.includes(category.id)}
            onChange={this.handleCategoryChange}
            disabled={this.state.activeCategoryFilter === "all"}
          />
          <label className="form-check-label" htmlFor={id}>
            {category.name}
          </label>
        </div>
      );
    });

    return categoriesHtml;
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div>
        <h3>Kategorien</h3>
        {this.renderCategoryFilter()}
        <div style={{ marginLeft: 20 + 'px' }}>
          { isFetching
          && <span className='inline-loading'/>
          }
          {this.renderCategories()}
        </div>

      </div>
    );
  }
}

Categories.propTypes = {
  active: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorCode: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    isFetching: state.category.isFetching,
    errorCode: state.category.errorCode
  };
};

export default connect(mapStateToProps)(Categories);
