import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Categories.css';
import { fetchCategoriesIfNeeded } from '../../_actions/category';

class Categories extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchCategoriesIfNeeded()
    );
  }

  render() {
    const { active, categories, isFetching } = this.props;

    const categoriesHtml = categories.map((category, idx) => {
      let itemClass = category.id === active ? "nav-item active" : "nav-item";

      return (
        <li className={itemClass} key={idx}>
          <Link className="nav-link" to={"/Erfahrungsberichte/" + category.id}>{category.name}</Link>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-jb-orange">
        <span className="navbar-brand">Kategorien</span>
        { isFetching
          && <span className='inline-loading'/>
        }
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {categoriesHtml}
        </ul>
      </nav>
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
