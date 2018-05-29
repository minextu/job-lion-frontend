import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import api from '../../ApiClient';
import AlertBox from '../../components/AlertBox';

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
    const query = queryString.parse(this.props.location.search);
    if (query.code) {
      this.setState({ code: query.code });
      this.onSubmit(query.code);
    }
  }

  onSubmit(code) {
    const { userId } = this.props.match.params;

    this.setState({ isFetching: true });

    api.get("v1/auth/activate", { user: userId, activationCode: code })
      .then(json => {
        if (json.error) {
          this.setState({ error: json.error, isFetching: false });
        }
        else {
          this.setState({ success: true, isFetching: false, error: null });
        }
      });
  }

  render() {
    const { error, isFetching, success, code } = this.state;

    return (
      <div>
        <h1>E-Mail bestätigen</h1>

        <AlertBox messageCode={error}/>

        { success
          && <div className='alert alert-success'>E-Mail wurde erfolgreich aktiviert. Du kannst dich jetzt einloggen</div>
        }

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
  location: PropTypes.object.isRequired
};

export default Activate;
