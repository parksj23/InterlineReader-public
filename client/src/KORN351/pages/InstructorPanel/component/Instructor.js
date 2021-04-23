import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import '../style/instructor.css';


class Instructor extends Component {

  componentWillMount(){
  }


  render() {
    return (
      <div className="instructor">
        <Grid container style={{height: "100%", flexGrow: 1}}>
          <Grid item xs={12} style={{height: "100%"}}>
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
