import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryList from '../Common/StoryList/StoryList';

import Grid from '@material-ui/core/Grid'

class EditGrammarContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
  }


  render() {
    return (
      <div className="edit-grammar-container">
       <Grid container>
         <Grid item xs={12}>
           <StoryList storyList={this.props.instructor.storyList} component={'editGrammar'}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditGrammarContainer);
