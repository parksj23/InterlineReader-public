import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { sendEmailVerification } from '../../actions/auth';
import Spinner from '../common/Spinner';
import {dashboardInit} from '../../actions/dashboard';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import ReactSVG from "react-svg";
import '../../Dashboard.css';

const parser = new DOMParser();


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

  renderClassStories = (name, stories) => {

    return (
      <Grid container>
        <Grid className="classNameHeader" item xs={12}>{name}</Grid>
        {stories.map((aStory,index) => {
          let storyName = aStory.slice(0, aStory.indexOf("_logo"))
          return (
    
            <Grid className="book" item xs={2}>
            <Link to={`/story/${storyName}`}>
                <img src={`http://127.0.0.1:5050/images/korn/${name}/badges/png/${aStory}`} alt="img" />
              </Link>
            </Grid>
          
            
          )

        })}

      </Grid>
    )
  }



  render() {
    const { user } = this.props.auth;
    const sections = this.props.dashboard.badges;
    let classNames;

    if(sections){
        classNames = Object.keys(sections)
    }

    let dashboardContent;

  
      if (true) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">AccountID: {user.name}</p>
            <p>Welcome to Interline Reader</p>
            {!user.isVerified && <p className='text-warning'>Don{"'"}t forget to verify your email.</p>}
          </div>
        );
      };

    

    return (

      <div className="dashboard">
        { <Grid container >
          {classNames ? classNames.map(aClass => {
            //console.log(aClass);
            var index = sections[aClass].indexOf(".DS_Store");
            index > -1 ? sections[aClass].splice(index, 1) : null;
            
            return this.renderClassStories(aClass, sections[aClass])
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
