import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";




class Story extends Component {

  state = {
    applicationDescription: ""
  }

  componentWillMount(){
  }


  render() {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10} >
          <Paper elevation={1}>
            <Grid container>
              <Grid item xs={3} />
              <Grid item xs={6}>
                TEST
              </Grid>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Story);