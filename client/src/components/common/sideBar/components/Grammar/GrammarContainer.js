import React, {Component} from "react";
import Grammar from "./Grammar";

import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../../../actions/vocab';

class GrammarContainer extends Component {
  constructor(props) {
    super(props);
    this.updateHighlightWord.bind(this);
  }

  componentWillUnmount(){
  }

  updateHighlightWord = (vocabWord, type) =>{
    this.props.updateHighlightedWord(vocabWord, type)

  }

  render(){
    const grammarList = this.props.grammar;
    return(
      <div>
        <Grammar grammarList={grammarList} updateHighlightWord={this.updateHighlightWord}/>
      </div>
    )
  }



}
const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id
  }
)

const mapDispatchToProps = ({updateHighlightedWord})

export default connect(mapStateToProps, mapDispatchToProps)(GrammarContainer);