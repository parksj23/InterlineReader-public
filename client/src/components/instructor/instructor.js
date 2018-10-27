import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CollapsableTabs from '../common/collapsableTabs/collapsableTabs'

class Instructor extends Component {

  componentWillMount(){
  }


  render() {
    return (
      <div className="instructor">
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid item xs={12}>
                <div className='instructor-heading'>
                  <h2>Instructor's Dashboard</h2>
                  <Divider/>
                </div>
              </Grid>
              <Grid item xs={3}>
                <CollapsableTabs/>
              </Grid>
            </Paper>
          </Grid>

        </Grid>

      </div>
    );
  }
}



const mapStateToProps = state => ({
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);
