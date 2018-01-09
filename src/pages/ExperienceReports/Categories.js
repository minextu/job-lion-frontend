import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Categories.css';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      active: props.active,
      isLoading: true
    };
  }

  componentDidMount() {
    // get all categories
    fetch('/api/v1/jobCategories/')
      .then(res => res.json())
      .then(categories => this.setState({ categories, isLoading: false }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active });
  }

  render() {
    const categories = this.state.categories.map((category, idx) => {
      let itemClass = category.id === this.state.active ? "nav-item active" : "nav-item";

      return (
        <li className={itemClass} key={idx}>
          <Link className="nav-link" to={"/Erfahrungsberichte/" + category.id}>{category.name}</Link>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-jb-orange">
        <span className="navbar-brand">Kategorien</span>
        { this.state.isLoading
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
  active: PropTypes.bool.isRequired,
};

export default Categories;
