import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

const styles = {
  root: {
    marginTop: "24px",
    marginBottom: "24px",
    backgroundColor: "#000000",
    borderRadius: "21px",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "3px"
  }
}

const SectionDivider = (props) => {
  const {classes} = props
  return (
    <Divider classes={{root: classes.root}}/>)
}


export default withStyles(styles)(SectionDivider);