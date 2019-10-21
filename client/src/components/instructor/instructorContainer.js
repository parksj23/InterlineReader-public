import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Instructor from './component/Instructor';
import{changeSelectedMenu, getStoryList} from "../../actions/instructor";
import {disableSideBarButton} from '../../actions/dashboard';
import AddStoryWizard from './AddStoryWizard/AddStoryWizard';
import AnalyticsContainer from './analytics/AnalyticsContainer';
import Stories from './stories/Stories';
import InstructorMenu from './component/InstructorMenu';
import Grid from "@material-ui/core/Grid"
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

class InstructorContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      oldName: null
    }
  }

  componentWillMount(){
    this.props.getStoryList();
    this.props.disableSideBarButton();
  }

  renameCollections =() => {
    let params = {
      oldName: this.state.oldName
    }
    axios.put('/api/instructor/renameCollection', params).then(res => {})
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  render() {
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
                      <Route exact path="/instructor" component={AnalyticsContainer} />
                      <Route path="/instructor/analytics" component={AnalyticsContainer} />
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
  getStoryList,
  disableSideBarButton
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorContainer);

//If need to rename collection, add this
/* <TextField
  id="standard-name"
  label="Name"
  value={this.state.oldName}
  onChange={this.handleChange('oldName')}
  margin="normal"
/>
<Button onClick={this.renameCollections}> RENAME </Button>*/