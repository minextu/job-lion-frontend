import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../ApiClient';
import history from '../../history';
import AlertBox from '../../components/AlertBox';
import { showLoginMessageCode } from '../../_actions/login';
import { connect } from 'react-redux';

class Activate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      isFetching: false,
      error: null,
      success: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    if (query.get('code')) {
      this.setState({ code: query.get('code') });
      this.onSubmit(query.get('code'));
    }
  }

  onSubmit(code) {
    const { userId } = this.props.match.params;

    this.setState({ isFetching: true });

    api.get("v1/auth/activate", { user: userId, activationCode: code })
      .then(json => {
        this.setState({ success: true, isFetching: false, error: null });
      })
      .catch(e => {
        this.setState({ error: e.message, isFetching: false });
      });
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { success } = this.state;

    if (success) {
      dispatch(showLoginMessageCode("LoginActivatedSuccessful"));
      history.push('/Anmelden');
    }
  }

  render() {
    const { error, isFetching, code } = this.state;

    return (
      <div>
        <h1>E-Mail bestätigen</h1>

        <AlertBox messageCode={error}/>
        <label htmlFor="activationCode">Bestätigungscode</label>
        <form className="form-inline" onSubmit={(e) => { e.preventDefault(); this.onSubmit(code); }}>
          <div className="form-group mb-2 mr-sm-3">
            <input required id="activationCode" className="form-control"
              type="text"
              value={code}
              onChange={(e) => this.setState({ code: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
          Bestätigen
          </button>

        </form>

        { isFetching
          && <div className='loading'/>
        }
      </div>
    );
  }
}

Activate.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Activate);
