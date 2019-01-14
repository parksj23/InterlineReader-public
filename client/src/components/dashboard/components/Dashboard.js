import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
//import '../Dashboard.css';
import ClassCard from './classCard';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';



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
          return (
            <Grid
              classes={{
                item: classes.cardContainer
              }}
              item xs={4} key={'story_badge' + index}>
             { <Link to={`/story/${name}/${aStory.storyName}`} className={'card-link'}>
                <ClassCard story={aStory} style={{width: "100%"}}/>
              </Link>}
            </Grid>

          )
        })}
      </Grid>
    )
  }



  render() {
    const sections = this.props.dashboard.storyList;
    let classNames;

    if(sections){
        classNames = Object.keys(sections)
    }

    return (

      <div className="dashboard">
        <div style={{top: "40vh", left: "45%", position: "absolute", display: "flex"}}>
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={'#36D7B7'}
            loading={this.props.dashboard.isDashboardLoading}
          />
        </div>
        { <Grid container >
          {classNames ? classNames.map((aClass,classIndex) => {
            return this.renderClassStories(aClass, sections[aClass], classIndex)
          }) : null}
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
