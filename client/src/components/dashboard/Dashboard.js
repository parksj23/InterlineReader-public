import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../../actions/auth';
import {dashboardInit} from '../../actions/dashboard';
import Grid from "@material-ui/core/Grid";
import '../../Dashboard.css';

class Dashboard extends Component {

  onDeleteClick = (e) => {
    //this.props.deleteAccount();
  }

  componentWillMount(){
    this.props.dashboardInit();
  }

  handleSendEmailVerification = () => {
    const { id } = this.props.auth.user;
    this.props.sendEmailVerification({ id }, this.props.history);
  }

  renderClassStories = (name, stories, classIndex) => {

    return (
      <Grid container key={'class_' + classIndex}>
        <Grid className="classNameHeader" item xs={12}>{name}</Grid>
        {stories.map((aStory,index) => {
          let storyName = aStory.slice(0, aStory.indexOf("_logo"))
          return (

            <Grid className="book" item xs={2} key={'story_badge' + index}>
              <Link to={`/story/${storyName}`}>
                <img src={`../../../public/images/korn/${name}/badges/png/${aStory}`} alt="img" />
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

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

const mapDispatchToProps = ({
  sendEmailVerification,
  dashboardInit
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
