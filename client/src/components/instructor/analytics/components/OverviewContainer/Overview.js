import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import ClassCard from '../classCard';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';

const styles = {
  cardContainer: {
    padding: "18px"
  }

}

class Overview extends Component {

  componentWillMount(){
  }

  render() {
    const sections = this.props.dashboard.storyList;
    let classNames;
    if(sections) classNames = Object.keys(sections)
    return (

      <div className="dashboard">
        <div style={{top: "40vh", left: "45%", position: "absolute", display: "flex"}}>
          OVERVIEW
        </div>
      </div>
    );
  }
}



export default withStyles(styles)(Overview);
