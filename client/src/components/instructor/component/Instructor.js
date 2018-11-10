import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import InstructorMenu from '../component/InstructorMenu';
import '../style/instructor.css';

class Instructor extends Component {

  componentWillMount(){
  }


  render() {
    return (
      <div className="instructor">
        <Grid container style={{height: "100%"}}>
          <Grid item xs={12}>
                {
                  this.props.children
                }
          </Grid>

        </Grid>

      </div>
    );
  }
}



const mapStateToProps = state => ({
  instructor: state.instructor
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);
