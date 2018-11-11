import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
//import '../Dashboard.css';
import ClassCard from './classCard';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  cardContainer: {
    padding: "18px"
  }

}

class Dashboard extends Component {

  componentWillMount(){
  }

  renderClassStories = (name, stories, classIndex) => {
    const {classes} = this.props
    return (
      <Grid container key={'class_' + classIndex}>
        <Grid className="classNameHeader" item xs={12}>{name}</Grid>
        {stories.map((aStory,index) => {
          let storyName = aStory.slice(0, aStory.indexOf("_logo"))
          return (
            <Grid
              classes={{
                item: classes.cardContainer
              }}
              item xs={4} key={'story_badge' + index}>
              <Link to={`/story/${storyName}`} className={'card-link'}>
                <ClassCard storyName={storyName} style={{width: "100%"}}/>
              </Link>
            </Grid>

          )
        })}
      </Grid>
    )
  }



  render() {
    const sections = this.props.dashboard.badges;
    let classNames;

    if(sections){
        classNames = Object.keys(sections)
    }

    return (

      <div className="dashboard">
        { <Grid container >
          {classNames ? classNames.map((aClass,classIndex) => {
            var index = sections[aClass].indexOf(".DS_Store");
            if(index > -1) sections[aClass].splice(index, 1);
            return this.renderClassStories(aClass, sections[aClass], classIndex)
          }) : <p>Loading</p>}
        </Grid> }
      </div>  
    );
  }
}

Dashboard.propTypes = {
  //deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
