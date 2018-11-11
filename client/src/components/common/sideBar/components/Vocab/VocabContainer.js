import React, {Component} from "react";
import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../../../actions/vocab';
import {addSavedWord, updateSavedWords} from "../../../../../actions/sideBar";
import Vocab from './Vocab';

const styles ={
  root: {
    maxWidth: "100%"
  }
}

class VocabContainer extends Component {
  constructor(props) {
    super(props);
    this.updateHighlightWord.bind(this);
    this.handleAddSavedWord.bind(this);
  }

  handleAddSavedWord =(vocabWord) => {
    let vocabList = this.props.stories.vocabList.vocabList;
    if(vocabList.indexOf(vocabWord.order_id) === -1){
      this.props.addSavedWord(vocabWord)
      this.props.addWord('success');
    }
  }

  updateHighlightWord = (vocabWord, type) =>{
    this.props.updateHighlightedWord(vocabWord, type)

  }

  componentWillUnmount(){
    let vocabList = this.props.stories.vocabList.vocabList;
    let params = {
      userId: this.props.userId,
      storyTitle: this.props.stories.storyTitle,
      vocabList
    }
    this.props.updateSavedWords(params);
  }
  render(){
    return(
        <div className={"vocab-Container"}>
          <Vocab
            vocab={this.props.vocab}
            updateHighlightWord={this.updateHighlightWord}
            handleAddSavedWord={this.handleAddSavedWord}
          />
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

const mapDispatchToProps = ({updateHighlightedWord, addSavedWord, updateSavedWords})

export default connect(mapStateToProps, mapDispatchToProps)(VocabContainer);