import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Instructor from './component/Instructor';
import{changeSelectedMenu, initInstructor} from "../../actions/instructor";
import {disableSideBarButton} from '../../actions/dashboard';
import AddStoryWizard from './AddStoryWizard/AddStoryWizard';
import AnalyticsContainer from './analytics/AnalyticsContainer';
import EditGrammarContainer from './EditGrammar/EditGrammarContainer';
import EditVocabContainer from './EditVocab/EditVocabContainer';
import Stories from './stories/Stories';
import InstructorMenu from './component/InstructorMenu';
import Grid from "@material-ui/core/Grid"
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import "./style/instructor.css";

class InstructorContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      oldName: null
    }
  }

  componentWillMount(){
    this.props.initInstructor();
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
      <div className="instructorContainer">
        <Paper style={{height: "calc(100vh - 90px - 70px)"}}>
        <Grid container style={{height: "100%", overflow: "scroll"}}>
          <Grid item xs={12}>
            <div className='instructor-heading'>
              <h2>{this.props.headerName}</h2>
              <Divider/>
            </div>
          </Grid>
          <Grid item xs={12} style={{flex: "1 0 0", height: "100%"}}>
            <Grid container  style={{height: "100%"}}>
                <div style={{height: "100%", display: 'flex'}}>
                  <InstructorMenu history={this.props.history} changeSelectedMenu={this.props.changeSelectedMenu}/>
                </div>
              <div style={{flex:1}}>
                <Instructor>
                    <Switch>
                      <Route exact path="/instructor" component={AnalyticsContainer} />
                      <Route path="/instructor/analytics" component={AnalyticsContainer} />
                      <Route path="/instructor/stories" component={Stories} />
                      <Route path="/instructor/addStory" component={AddStoryWizard} />
                      <Route path="/instructor/editGrammar" component={EditGrammarContainer}/>
                      <Route path="/instructor/editVocab" component={EditVocabContainer}/>
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
  selected: state.instructor.selectedMenu,
  headerName: state.instructor.headerName
});

const mapDispatchToProps = ({
  changeSelectedMenu,
  initInstructor,
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