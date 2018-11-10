import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class AddStoryWizard extends Component {
  constructor(props){
    super(props)
  }

  render(){

    return (
      <Grid item xs={8}>
        <div style={{paddingLeft: "12px"}}>
          <h1>ADD STORY</h1>
        </div>
      </Grid>
    )


  }


}

export default AddStoryWizard;