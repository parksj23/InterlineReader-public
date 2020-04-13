import React, { Component } from "react";
import { connect } from "react-redux";
import AddMidKRGram from "./AddMidKRGram";
import StatusMessage from '../../common/statusMessage/statusMessage';
import {getMiddleKoreanGram, handleStatusClose} from "../../../actions/instructor";


class AddMidKRGramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStatus: false
    };
  }

  componentWillMount() {
    this.props.getMiddleKoreanGram();
  }

  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <AddMidKRGram grammarList={this.props.addMiddleKrGram.grammarList}/>
        <StatusMessage status="success"
                       open={this.props.addMiddleKrGram.addNewGrammarMessage}
                       message={this.props.addMiddleKrGram.addNewGrammarMessage}
                       handleClose={ this.props.handleStatusClose}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addMiddleKrGram: state.instructor.addMiddleGram
});

const mapDispatchToProps = {
  getMiddleKoreanGram ,
  handleStatusClose
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMidKRGramContainer);
