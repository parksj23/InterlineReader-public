import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryList from '../Common/StoryList/StoryList';
import {Route, Switch } from 'react-router-dom';

import Grid from '@material-ui/core/Grid'
import EditGrammar from "./EditGrammar";
import {getStoryInfo, getGrammar, resetEditGrammar} from "../../../actions/instructor";

class EditGrammarContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillUnmount(){
    this.props.resetEditGrammar()
  }

  renderStoryList = () => {
    return <StoryList storyList={this.props.storyList} component={'editGrammar'}/>
  }

  render() {
    return (
      <div className="edit-grammar-container">
       <Grid container>
         <Grid item xs={12}>
           <Switch>
             <Route exact path="/instructor/editGrammar" component={this.renderStoryList} />
             <Route path="/instructor/editGrammar/:storyName" component={EditGrammar} />
           </Switch>
         </Grid>
       </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  instructor: state.instructor,
  storyList: state.app.storyList
});

const mapDispatchToProps = ({
  getGrammar,
  getStoryInfo,
  resetEditGrammar
})

export default connect(mapStateToProps, mapDispatchToProps)(EditGrammarContainer);
