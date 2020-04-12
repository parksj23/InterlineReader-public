import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryList from '../Common/StoryList/StoryList'
import {Route, Switch } from 'react-router-dom';
import EditVocab from './EditVocab';


import{ getVocabulary, resetEditVocab } from "../../../actions/instructor";

import Grid from '@material-ui/core/Grid'

class EditVocabularyContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentWillMount(){
  }

  componentWillUnmount(){
    this.props.resetEditVocab()
  }

  renderStoryList = () => {
    return <StoryList storyList={this.props.storyLists.allStories} component={'editVocab'}/>
  }

  render() {
    return (
      <div className="edit-Vocabulary-container">
        <Grid container>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/instructor/editVocab" component={this.renderStoryList} />
              <Route path="/instructor/editVocab/:storyName" component={EditVocab} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  instructor: state.instructor,
  storyLists: state.app.storyLists
});

const mapDispatchToProps = ({
  getVocabulary,
  resetEditVocab
})

export default connect(mapStateToProps, mapDispatchToProps)(EditVocabularyContainer);
