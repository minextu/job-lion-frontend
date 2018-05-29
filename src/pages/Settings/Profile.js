import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLoginInfoIfNeeded } from '../../_actions/login';
import AlertBox from '../../components/AlertBox';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { messageCode: "NotImplemented" };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchLoginInfoIfNeeded()
    );
  }

  onSave() {
    //this.setState({ messageCode: "NotImplemented" });
  }

  render() {
    const { firstName, lastName, avatar } = this.props.info;
    const { messageCode } = this.state;

    return (
      <div className="card">
        <div className="card-header">
        Öffentliches Profil
        </div>
        <div className="card-body">

          <AlertBox messageCode={messageCode}/>

          <h5 className="card-title">Grundinformationen</h5>
          <div className="card-text container-fluid">
            <div className="row flex-row-reverse">
              <div className="col-sm-3">

                <label>Avatar</label>
                <br/>
                <img src={avatar} alt='avatar' className="img-fluid"/>
                <small className="form-text text-muted">
                Der Avatar kann auf
                  {' '}<a target="_blank" rel="noopener noreferrer" href="http://gravatar.com">http://gravatar.com</a>{' '}
                geändert werden.
                </small>

              </div>
              <div className="col">

                <div className="form-group">
                  <label htmlFor="firstName">Vorname</label>
                  <input type="text" className="form-control" id="firstName"
                    placeholder="Vorname" value={firstName || "..."}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nachname</label>
                  <input type="text" className="form-control" id="lastName"
                    placeholder="Nachname" value={lastName || "..."}
                    readOnly
                  />
                </div>

                <button className="btn btn-primary" onClick={() => this.onSave()}>Speichern</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  info: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    info: state.login.info
  };
};

export default connect(mapStateToProps)(Profile);
