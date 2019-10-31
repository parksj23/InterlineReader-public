import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

const styles = {
  root: {
    marginTop: "16px",
    marginBottom: "16px"
  }

}

const SectionDivider = (props) => {
  const {classes} = props
  return (
    <Divider classes={{root: classes.root}}/>)
}


export default withStyles(styles)(SectionDivider);