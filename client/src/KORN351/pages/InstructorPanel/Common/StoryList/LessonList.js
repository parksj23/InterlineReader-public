import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ClassCard from './LessonCard';
import { withStyles } from '@material-ui/core/styles';
import './StoryList.css';
const styles = {
  cardContainer: {
    padding: "18px"
  }

}

class LessonList extends Component {

  componentWillMount(){
  }

  renderClassStories = (lesson, classIndex) => {
    const {classes, match} = this.props;
    return (
      <Grid
        classes={{
          item: classes.cardContainer
        }}
        item xs={4} key={'story_badge' + classIndex}>
       {match.url.includes("editLesson")? <Link to={`/instructor351/editLesson/${lesson}`} className={'card-link'}>
          <ClassCard lesson={lesson} style={{width: "100%"}}/>
        </Link> :
           <Link to={`/instructor351/editOkpyeon/${lesson}`} className={'card-link'}>
               <ClassCard lesson={lesson} style={{width: "100%"}}/>
           </Link>
       }
      </Grid>
    )
  }



  render() {
    const storyList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    return (

      <div className="class-list">
        { <Grid container >
          {storyList ? storyList.map((lesson,classIndex) => {
            return this.renderClassStories(lesson, classIndex)
          }) : null}
        </Grid> }
      </div>
    );
  }
}

export default withStyles(styles)(LessonList);
