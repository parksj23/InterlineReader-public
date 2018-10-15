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

const parser = new DOMParser();

let divStyle = {
  'width': '500px',
  'display': 'flex',
  'justify-content': 'space-evenly',
  'top': '140px'
};

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
        <Grid item xs={12}>{name}</Grid>
        {stories.map((aStory,index) => {
          let storyName = aStory.slice(0, aStory.indexOf("_logo"))
          return (
            <Grid key={index} item xs={4} style={{height: "100px"}}>
              <Link to={`/story/${storyName}`}>
                <ReactSVG style={{height: "60px"}} src={`http://127.0.0.1:5050/images/korn/${name}/badges/svg/${aStory}`} />
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
        <div className="container">
        <div col-md-12>
              <h1>KORN 410A</h1>
        </div>
          <div className="row">

 
              {/* <Grid container >
                {classNames ? classNames.map(aClass => {
                  return this.renderClassStories(aClass, sections[aClass])
                }) : <p>Loading</p>}
              </Grid> */}

                <div className="book books-1 col-md-2"></div>
                <div className="col-md-1"></div>
                <div className="book books-2 col-md-2"></div>
                <div className="col-md-1"></div>
                <div className="book books-3 col-md-2"></div>
                <div className="col-md-1"></div>
              </div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="col-md-12"></div>
              <div className="row">
          
              <div className="book books-4 col-md-2"></div>
                <div className="col-md-1"></div>
                <div className="book books-5 col-md-2"></div>
                <div className="col-md-1"></div>
                <div className="book books-6 col-md-2"></div>
                <div className="col-md-1"></div>    
            
            </div>
         
        </div>
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
