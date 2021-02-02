import React, {Component} from "react";
import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../../../actions/KORN410/vocab';
import {addSavedWord, updateSavedWords, addToSavedWords} from "../../../../../actions/KORN410/sideBar";
import Vocab from './Vocab';


class VocabContainer extends Component {
  constructor(props) {
    super(props);
    this.updateHighlightWord.bind(this);
    this.handleAddSavedWord.bind(this);
  }

  handleAddSavedWord =(vocabWord) => {
    if(this.props.sideBar.savedVocabIds.indexOf(vocabWord._id) === -1){
      this.props.addSavedWord(vocabWord)
        let savedVocabIds = this.props.sideBar.savedVocabIds;
      let savedWords = this.props.sideBar.savedWords;
        let index = savedVocabIds.indexOf(vocabWord._id);
        if(index === -1) {
            savedVocabIds.push(vocabWord._id);
            savedWords.push(vocabWord)
        }
        let params = {
            userId: this.props.userId,
            storyId: this.props.stories.storyInfo._id,
            savedVocabIds: savedVocabIds,
            savedWords: savedWords
        }
        this.props.updateSavedWords(params);
      this.props.addWord('success');
    }
  }

  updateHighlightWord = (vocabWord, type) =>{
    this.props.updateHighlightedWord(vocabWord, type)

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
    userId: state.auth.user.id,
    sideBar: state.sideBar
  }
)

const mapDispatchToProps = ({updateHighlightedWord, addSavedWord, updateSavedWords, addToSavedWords})

export default connect(mapStateToProps, mapDispatchToProps)(VocabContainer);