import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Switch } from 'react-router-dom';
import AddMidKRVoc from './AddMidKRVoc';

import Grid from '@material-ui/core/Grid'

class AddMidKRVocContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentWillMount(){
  }

  componentWillUnmount(){
  }

  render() {
    return (
      <div className="edit-Vocabulary-container">
        <AddMidKRVoc/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMidKRVocContainer);
