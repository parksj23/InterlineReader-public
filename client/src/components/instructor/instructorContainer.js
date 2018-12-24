import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Instructor from './component/Instructor';
import{changeSelectedMenu, getStoryList} from "../../actions/instructor";
import AddStoryWizard from './AddStoryWizard/AddStoryWizard';
import Analytics from './analytics/Analytics';
import Stories from './stories/Stories';
import InstructorMenu from './component/InstructorMenu';
import Grid from "@material-ui/core/Grid"
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


class InstructorContainer extends Component {

  componentWillMount(){
    this.props.getStoryList();
  }

  render() {
    const {selected} = this.props;
    return (
      <div className="instructor">
        <Paper style={{height: "calc(100vh - 90px - 70px)"}}>
        <Grid container style={{height: "100%", overflow: "scroll"}}>
          <Grid item xs={12}>
            <div className='instructor-heading'>
              <h2>Instructor's Dashboard</h2>
              <Divider/>
            </div>
          </Grid>
          <Grid item xs={12} style={{flex: "1 0 0", height: "100%"}}>
            <Grid container  style={{height: "100%"}}>
                <div style={{height: "100%", display: 'flex'}}>
                  <InstructorMenu history={this.props.history}/>
                </div>
              <div style={{flex:1}}>
                <Instructor>
                    <Switch>
                      <Route exact path="/instructor" component={Analytics} />
                      <Route path="/instructor/analytics" component={Analytics} />
                      <Route path="/instructor/stories" component={Stories} />
                      <Route path="/instructor/addStory" component={AddStoryWizard} />
                    </Switch>
                </Instructor>
              </div>
              </Grid>
          </Grid>
        </Grid>
        </Paper>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  selected: state.instructor.selectedMenu
});

const mapDispatchToProps = ({
  changeSelectedMenu,
  getStoryList
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorContainer);
