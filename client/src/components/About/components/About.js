import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactHtmlParser from "react-html-parser";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';

const styles = {

}
const About = (props) => {
  const {logo} = props;
  return(
    <Paper elevation={1}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <div className={"about-logo"}>{ReactHtmlParser(logo)}</div>
        </Grid>
      </Grid>
      <Divider/>

      <Grid item xs={12} className={"about-section"}>
        <h1>Official Name:</h1>
        <p>Interline Reader</p>
      </Grid>
      <Divider/>
      <Grid item xs={12} className={"about-section"}>
        <h1>Application Description:</h1>
        <p>The Interline Reader is an interlingual reading tool being developed at the Asian Studies Department, University of British Columbia. Based on an interlinear approach to reading source texts, the platform allows for a seamless reading experience via the pre-loaded vocabulary and grammar notes. Click on a vocabulary word or grammar pattern located to the left of the story and the same word or pattern is highlighted in the context of the story. Read the original story with a little help from ‘interactive subtitles’. Using Hypothesis, the Interline Reader makes it easy to take notes, annotate, highlight, and collaborate.</p>
      </Grid>

      <Divider/>
      <Grid item xs={12} className={"about-section"}>
        <h1>Contributors</h1>
          <h2>(Click to contact by email)</h2>
        <div><p style={{fontWeight: "700"}}><a href="mailto:dhanjiarmaan@gmail.com" target="_top">Software Development: Armaan Dhanji</a></p></div>
        <div><p style={{fontWeight: "700"}}><a href="mailto:dawndkim@alumni.ubc.ca" target="_top">Site Design &amp; Project Co-ordinator: Dawn Kim</a></p></div>
          <div><p style={{fontWeight: "700"}}><a href="mailto:amy.george@ubc.ca" target="_top">Project Co-ordinator: Amy George</a></p></div>
        <div><p style={{fontWeight: "700"}}><a href="mailto:Ross.King@ubc.ca" target="_top">Principal Investigator: Dr. Ross King</a></p></div>
      </Grid>
    </Paper>
  )


}

export default withStyles(styles)(About)