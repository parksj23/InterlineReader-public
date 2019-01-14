import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../../actions/auth';
import {dashboardInit, disableSideBarButton, enableDashboardLoading, disableDashboardLoading} from '../../actions/dashboard';
import Dashboard from './components/Dashboard';


class DashboardContainer extends Component {

  componentWillMount(){
    this.props.enableDashboardLoading();
    this.props.dashboardInit().then( resp => {
      this.props.disableDashboardLoading();
    });
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
  disableSideBarButton,
  enableDashboardLoading,
  disableDashboardLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);