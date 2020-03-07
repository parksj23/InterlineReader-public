import React, { Component } from "react";
import { connect } from "react-redux";
import AddMidKRGram from "./AddMidKRGram";
import { getMiddleKoreanGram } from "../../../actions/instructor";


class AddMidKRGramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getMiddleKoreanGram();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <AddMidKRGram grammarList={this.props.addMiddleK}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addMiddleKrGram: state.instructor.addMiddleVocab
});

const mapDispatchToProps = { getMiddleKoreanGram };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMidKRGramContainer);
