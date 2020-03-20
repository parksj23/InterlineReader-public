import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Classes from './Classes';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { getClasses, addNewClass, updateClass } from '../../../actions/instructor';
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

    this.props.storyList.forEach(aStory => {
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

    this.props.storyList.forEach(aStory => {
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
        <span><h1> Your classes </h1></span>
        <span style={{float: 'right'}}><Button variant='contained' onClick={() => this.props.history.push('/instructor/classes/newClass')}>New Class</Button></span>
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
      let classInfo = this.props.instructor.classes.find(aClass => aClass._id === match.params.id);
      return (
        <NewClass handleAddNewClass={this.handleUpdateClass}
                  storyList={this.props.storyList}
                  classInfo={classInfo}
                  handleCancel={this.handleCancel}
        />
      )
    } else {
      return (
        <NewClass handleAddNewClass={this.handleAddNewClass} storyList={this.props.storyList}/>
      )
    }
  }

  render() {
    return (
      <div className="classes-container">
        <Grid container>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/instructor/classes" component={this.renderClassOverview} />
              <Route path="/instructor/classes/newClass"
                     component={({match}) => this.renderClass('new', match)} />
              <Route path="/instructor/classes/editClass/:id" component={({match}) => this.renderClass('edit', match)} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  instructor: state.instructor,
  storyList: state.app.storyList,
  auth: state.auth
});

const mapDispatchToProps = ({
  getClasses,
  addNewClass,
  updateClass
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer);
