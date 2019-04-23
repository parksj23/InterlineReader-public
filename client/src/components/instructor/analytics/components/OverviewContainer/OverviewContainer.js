import React, { Component } from 'react';
import {connect} from "react-redux";


class AnalyticsContainer extends Component {

  componentWillMount(){
  }

  render(){
    return (
      <div className={'instructor-analytics-overview-container'}>
        OVERVIEW
      </div>
    )


  }


}


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);