import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import ClassCard from './classCard';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';

const styles = {
  cardContainer: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: " 0.4rem",
    paddingRight: "3rem"
  }
}

class Dashboard extends Component {

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
       { <Link to={`/story?storyTitle=${aStory.storyName}`} className={'card-link'}>
          <ClassCard story={aStory} style={{width: "100%"}}/>
        </Link>}
      </Grid>
    )
  }

  render() {
    const {storyList} = this.props
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
          {storyList ? storyList.map((aClass,classIndex) => {
            return this.renderClassStories(aClass, classIndex)
          }): null}
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
