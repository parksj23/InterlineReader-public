import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../../actions/KORN410/auth';
import { Route, Switch } from 'react-router-dom';
import {dashboardInit, disableSideBarButton, enableDashboardLoading, disableDashboardLoading} from '../../actions/KORN410/dashboard';
import Dashboard from './components/dashboard/Dashboard';
import MiddleKoreanContainer from './components/MiddleKoreanContainer';
import ModernKoreanContainer from './components/ModernKoreanContainer';
import Dashboard351 from '../../KORN351/Dashboard';


class DashboardContainer extends Component {

  componentWillMount(){
    this.props.enableDashboardLoading();
    this.props.dashboardInit().then( resp => {
      this.props.disableDashboardLoading();
    });
    this.props.disableSideBarButton();
  }
  renderDashboard = (className) => {
    return (
      <Dashboard dashboard={this.props.dashboard}
                 storyList={
                   className === "ALL" ? this.props.storyLists.allStories :
                     className === "KORN410" ? this.props.storyLists.korn410Stories:
                       this.props.storyLists.korn420Stories
                 }
                 auth={this.props.auth}/>
    )
  }

  render() {
    return (
      <div className="dashboardContainer">
          <Switch>
            <Route exact path="/dashboard" component={() => this.renderDashboard("KORN410")} />
            <Route path='/dashboard/middleKorean' component={MiddleKoreanContainer} />
              <Route path='/dashboard/modernKorean' component={ModernKoreanContainer} />
              <Route exact path='/dashboard/KORN351' component={Dashboard351} />
            <Route path='/dashboard/KORN410' component={() => this.renderDashboard("KORN410")} />
            <Route path='/dashboard/KORN420' component={() => this.renderDashboard("KORN420")} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard,
  storyLists: state.app.storyLists
});

const mapDispatchToProps = ({
  sendEmailVerification,
  dashboardInit,
  disableSideBarButton,
  enableDashboardLoading,
  disableDashboardLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);