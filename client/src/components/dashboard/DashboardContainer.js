import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../../actions/auth';
import {dashboardInit} from '../../actions/dashboard';
import Dashboard from './components/Dashboard'

class DashboardContainer extends Component {

  componentWillMount(){
    this.props.dashboardInit();
  }

  render() {
    return (
      <div className="dashboardContainer">
        <Dashboard dashboard={this.props.dashboard} auth={this.props.auth}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  //deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

const mapDispatchToProps = ({
  sendEmailVerification,
  dashboardInit
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);