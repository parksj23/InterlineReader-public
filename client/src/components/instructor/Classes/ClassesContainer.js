import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Classes from './Classes';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { getClasses, addNewClass, updateClass } from '../../../actions/KORN410/instructor';
import {Route, Switch } from 'react-router-dom';
import NewClass from './NewClass';

class ClassesContainer extends Component {

  componentWillMount(){
    this.props.getClasses(this.props.auth.user.id);
  }

  handleAddNewClass = (classInfo) => {
    let storyNames = classInfo.storyList
    let storyList = []
    let createdDate = new Date();
    let lastUpdated = new Date();

    this.props.storyLists.allStories.forEach(aStory => {
      if(storyNames.indexOf(aStory.storyName) > -1) {
        storyList.push(aStory._id)
      }
    })

    this.props.addNewClass({
      ...classInfo,
      storyList,
      createdDate,
      lastUpdated,
      instructorId: this.props.auth.user.id
    }, this.props.history)
  }

  handleUpdateClass = (classInfo) => {
    let storyNames = classInfo.storyList
    let storyList = []
    let lastUpdated = new Date();

    this.props.storyLists.allStories.forEach(aStory => {
      if(storyNames.indexOf(aStory.storyName) > -1) {
        storyList.push(aStory._id)
      }
    })

    this.props.updateClass({
      ...classInfo,
      storyList,
      lastUpdated,
      instructorId: this.props.auth.user.id
    }, this.props.history)
  }

  handleCancel = () => {
    this.props.history.goBack();
  }

  renderClassOverview = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
        <span style={{float: 'right'}}><Button variant='contained' onClick={() => this.props.history.push('/instructor410/classes/newClass')}>New Class</Button></span>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <Classes classList={this.props.instructor.classes} history={this.props.history}/>
        </Grid>
      </Grid>
    )
  }

  renderClass = (type, match) => {
    if(type === 'edit') {
      let classInfo = this.props.instructor.classes.find(aClass => {
        return aClass._id === match.params.id
      });
      console.log(classInfo)
      return (
        <NewClass handleAddNewClass={this.handleUpdateClass}
                  storyLists={this.props.storyLists}
                  classInfo={classInfo}
                  handleCancel={this.handleCancel}
                  isEdit={true}
        />
      )
    } else {
      return (
        <NewClass handleAddNewClass={this.handleAddNewClass}
                  storyLists={this.props.storyLists}
                  isEdit={false}
                  handleCancel={this.handleCancel}
        />
      )
    }
  }

  render() {
    return (
      <div className="classes-container">
        <Grid container>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/instructor410/classes" component={this.renderClassOverview} />
              <Route path="/instructor410/classes/newClass"
                     component={({match}) => this.renderClass('new', match)} />
              <Route path="/instructor410/classes/editClass/:id" component={({match}) => this.renderClass('edit', match)} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  instructor: state.instructor,
  storyLists: state.app.storyLists,
  auth: state.auth
});

const mapDispatchToProps = ({
  getClasses,
  addNewClass,
  updateClass
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer);
