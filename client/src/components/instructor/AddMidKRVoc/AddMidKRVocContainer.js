import React, { Component } from "react";
import { connect } from "react-redux";
import AddMidKRVoc from "./AddMidKRVoc";
import StatusMessage from '../../common/statusMessage/statusMessage';
import {setInstructorLoading, getMiddleKoreanVocab, handleStatusClose } from "../../../actions/KORN410/instructor";

class AddMidKRVocContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getMiddleKoreanVocab();
  }
  componentDidMount() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <AddMidKRVoc vocabList={this.props.addMiddleKrVocab.vocabList}/>
        <StatusMessage status="success"
                       open={this.props.addMiddleKrVocab.addNewVocabStatusMessage}
                       message={this.props.addMiddleKrVocab.addNewVocabStatusMessage}
                       handleClose={ this.props.handleStatusClose}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addMiddleKrVocab: state.instructor.addMiddleVocab
});

const mapDispatchToProps = {setInstructorLoading, getMiddleKoreanVocab, handleStatusClose };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMidKRVocContainer);
