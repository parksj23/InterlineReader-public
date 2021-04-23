import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ClassCard from './classCard';
import { withStyles } from '@material-ui/core/styles';
import './StoryList.css';
const styles = {
  cardContainer: {
    padding: "18px"
  }

}

class ClassList extends Component {

  componentWillMount(){
  }

  renderClassStories = (aStory, classIndex) => {
    const {classes} = this.props
    return (
      <Grid
        classes={{
          item: classes.cardContainer
        }}
        item xs={4} key={'story_badge' + classIndex}>
       { <Link to={`/instructor410/${this.props.component}/${aStory.storyName}`} className={'card-link'}>
          <ClassCard story={aStory} style={{width: "100%"}}/>
        </Link>}
      </Grid>
    )
  }



  render() {
    const storyList = this.props.storyList;
    return (

      <div className="class-list">
        { <Grid container >
          {storyList ? storyList.map((aClass,classIndex) => {
            return this.renderClassStories(aClass, classIndex)
          }) : null}
        </Grid> }
      </div>
    );
  }
}

export default withStyles(styles)(ClassList);
