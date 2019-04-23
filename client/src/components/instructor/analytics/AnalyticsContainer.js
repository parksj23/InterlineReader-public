import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import ClassCard from './components/classCard';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {dashboardInit} from "../../../actions/dashboard";
import Analytics from './components/Analytics'
import OverviewContainer from './components/OverviewContainer/OverviewContainer'
import {Route, Switch } from 'react-router-dom';
import Stories from "../stories/Stories";
import AddStoryWizard from "../AddStoryWizard/AddStoryWizard";





class AnalyticsContainer extends Component {

  componentWillMount(){
    this.props.dashboardInit()
  }

  renderAnalytics = () => {
    return (<Analytics dashboard={this.props.dashboard} auth={this.props.auth}/>)
}

  render(){
    const sections = this.props.dashboard.storyList;
    let classNames;
    if(sections) classNames = Object.keys(sections)
    return (
        <div className={'instructor-analytics-container'}>
          <div style={{paddingLeft: "12px", borderBottom: "solid 1px #000"}}>
            <Grid container style={{marginTop: "12px"}}>
              <Grid item xs={3}>
                <h3 style={{float: "left"}}>Analytics</h3>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: "12px"}}>
              <Switch>
                <Route exact path="/instructor" component={this.renderAnalytics} />
                <Route path={`/instructor/analytics/overview`} component={OverviewContainer} />
              </Switch>
              <Grid item xs={2}>
              </Grid>

            </Grid>
          </div>
        </div>
    )


  }


}


const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

const mapDispatchToProps = ({
  dashboardInit,
})

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);