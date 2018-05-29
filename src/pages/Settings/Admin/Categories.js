import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategoriesIfNeeded, deleteCategory } from '../../../_actions/category';
import AlertBox from '../../../components/AlertBox';

class Categories extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchCategoriesIfNeeded()
    );
  }

  onDelete(id) {
    this.props.dispatch(
      deleteCategory(id)
    );
  }

  render() {
    const { categories, errorCodeDelete } = this.props;

    return (
      <div className="card">
        <div className="card-header">
        Job Kategorien
        </div>
        <div className="card-body">

          <AlertBox messageCode={errorCodeDelete}/>

          <h5 className="card-title">Alle Kategorien</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scrope="col">Name</th>
                <th scrope="col">User</th>
                <th scrope="col">Erstellt</th>
                <th scope="col">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, idx) => (
                <tr key={idx}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>
                    <img height="20px" src={category.user.avatar} alt=""/>{' '}
                    {category.user.email}
                  </td>
                  <td>{category.created}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => this.onDelete(category.id)}>
                    Löschen
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  errorCodeDelete: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    info: state.login.info,
    categories: state.category.categories,
    errorCodeDelete: state.category.errorCodeDelete
  };
};

export default connect(mapStateToProps)(Categories);
