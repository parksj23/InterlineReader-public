import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Instructor from './component/Instructor';
import{changeSelectedMenu} from "../../actions/instructor";
import AddStoryWizard from './AddStoryWizard/AddStoryWizard';
import Analytics from './analytics/Analytics';
import Stories from './stories/Stories';
import InstructorMenu from './component/InstructorMenu';
import Grid from "@material-ui/core/Grid"
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


class InstructorContainer extends Component {

  componentWillMount(){
  }


  render() {
    const {selected} = this.props;
    return (
      <div className="instructor">
        <Paper style={{height: "calc(100vh - 90px - 70px)"}}>
        <Grid container>
          <Grid item xs={12}>
            <div className='instructor-heading'>
              <h2>Instructor's Dashboard</h2>
              <Divider/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3} style={{height: "100%"}}>
                <div>
                  <InstructorMenu history={this.props.history}/>
                </div>
              </Grid>
              <Grid item xs={9}>
              <Instructor>
                  <Switch>
                    <Route path="/instructor/analytics" component={Analytics} />
                    <Route path="/instructor/stories" component={Stories} />
                    <Route path="/instructor/addStory" component={AddStoryWizard} />
                  </Switch>
              </Instructor>
              </Grid>
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
  changeSelectedMenu
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorContainer);
