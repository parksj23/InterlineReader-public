import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
import  {fetchLogo} from "../../actions/about";
import axios from"axios";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import "./style/about.css"




class About extends Component {

    state = {
        applicationDescription: ""
    }

    componentWillMount(){
      this.props.fetchLogo();
    }

    somefunction = (x,q) => {

    }

    render() {
        const {logo} = this.props.about;
        return (
            <Grid container>
                <Grid item xs={1} />
                <Grid item xs={10} >
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
                            <h1>Contributors (Click to contact by email)</h1>
                            <div><p>Software Development: Armaan Dhanji</p></div>
                            <div><p>Site Design &amp; Project Co-ordinator: Dawn Kim</p></div>
                            <div><p>Principal Investigator: Dr. Ross King</p></div>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
            );
    }
}

const mapStateToProps = state => (
  {about: state.about}
)

const mapDispatchToProps = ({
  fetchLogo
})

export default connect(mapStateToProps, mapDispatchToProps)(About);