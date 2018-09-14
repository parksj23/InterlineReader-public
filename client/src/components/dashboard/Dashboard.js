import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { sendEmailVerification } from '../../actions/auth';
import Spinner from '../common/Spinner';

class Dashboard extends Component {


  onDeleteClick = (e) => {
    //this.props.deleteAccount();
  }

  handleSendEmailVerification = () => {
    const { id } = this.props.auth.user;
    this.props.sendEmailVerification({ id }, this.props.history);
  }

  render() {
    const { user } = this.props.auth;

    let dashboardContent;

  
      if (true) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">AccountID: {user.name}</p>
            <p>Welcome to Interline Reader</p>
            {!user.isVerified && <p className='text-warning'>Don{"'"}t forget to verify your email.</p>}
          </div>
        );
      };
    

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Stories</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  //deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { sendEmailVerification })(Dashboard);
