import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AddMidKRGram from "./AddMidKRGram";
import { getMiddleKorean } from "../../../actions/instructor";

import Grid from "@material-ui/core/Grid";

class AddMidKRGramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getMiddleKorean();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <AddMidKRGram grammarList={this.props.addMiddleKrGram.grammarList}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addMiddleKrGram: state.instructor.addMiddleGram
});

const mapDispatchToProps = { getMiddleKorean };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMidKRGramContainer);
