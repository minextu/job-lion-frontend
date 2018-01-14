import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Categories.css';
import { requestCategories } from '../../_actions/category';

class Categories extends Component {
  // fetch categories if not cached
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.dispatch(
        requestCategories()
      );
    }
  }

  render() {
    const categories = this.props.categories.map((category, idx) => {
      let itemClass = category.id === this.props.active ? "nav-item active" : "nav-item";

      return (
        <li className={itemClass} key={idx}>
          <Link className="nav-link" to={"/Erfahrungsberichte/" + category.id}>{category.name}</Link>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-jb-orange">
        <span className="navbar-brand">Kategorien</span>
        { this.props.isFetching
          && <span className='inline-loading'/>
        }
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {categories}
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
