import React, { Component } from "react";
import { connect } from "react-redux";
import AddMidKRVoc from "./AddMidKRVoc";
import { getMiddleKoreanVocab } from "../../../actions/instructor";

class AddMidKRVocContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getMiddleKoreanVocab();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <AddMidKRVoc vocabList={this.props.addMiddleKrVocab.vocabList}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addMiddleKrVocab: state.instructor.addMiddleVocab
});

const mapDispatchToProps = { getMiddleKoreanVocab };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMidKRVocContainer);
