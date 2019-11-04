import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import {connect} from "react-redux";
import Analytics from './components/Analytics'
import OverviewContainer from './components/OverviewContainer/OverviewContainer'
import {Route, Switch } from 'react-router-dom';






class AnalyticsContainer extends Component {

  componentWillMount(){
  }

  renderAnalytics = () => {
    return (<Analytics dashboard={this.props.dashboard} auth={this.props.auth}/>)
}

  render(){
    const sections = this.props.dashboard.storyList;
    let classNames;
    let pathnames = this.props.location.pathname.split("/");


    if(sections) classNames = Object.keys(sections)
    return (
        <div className={'instructor-analytics-container'}>
            <Grid container style={{marginTop: "12px"}}>
              <Switch>
                <Route exact path="/instructor" component={this.renderAnalytics} />
                <Route exact path="/instructor/analytics" component={this.renderAnalytics} />
                <Route path={`/instructor/analytics/overview`} component={OverviewContainer} />
              </Switch>
              <Grid item xs={2}>
              </Grid>
            </Grid>
        </div>
    )


  }


}


const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);