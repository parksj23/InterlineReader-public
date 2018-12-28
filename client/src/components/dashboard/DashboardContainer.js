import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../../actions/auth';
import {dashboardInit, disableSideBarButton} from '../../actions/dashboard';
import Dashboard from './components/Dashboard'

class DashboardContainer extends Component {

  componentWillMount(){
    this.props.dashboardInit();
    this.props.disableSideBarButton();
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
  dashboardInit,
  disableSideBarButton
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);