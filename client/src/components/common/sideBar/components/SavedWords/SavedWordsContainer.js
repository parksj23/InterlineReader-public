import React, {Component} from "react";
import {connect} from "react-redux";
import {getSavedWords, deleteSavedWord, updateSavedWords} from "../../../../../actions/sideBar";
import SavedWords from './SavedWords';
import {updateHighlightedWord} from "../../../../../actions/vocab";

class SavedWordsContainer extends Component {

  shouldComponentUpdate(nextProps,nextState){
    if(this.props.sideBar.savedWords){
      return this.props.sideBar.savedWords === nextProps.sideBar.savedWords
    }
    return false
  }

  handleDelete = (vocabWord) => {
    if(this.props.sideBar.savedVocabIds.indexOf(vocabWord._id) !== -1){
      this.props.deleteSavedWord(vocabWord);
    }
  }

    updateHighlightWord = (vocabWord, type) =>{
        this.props.updateHighlightedWord(vocabWord, type)
    }

  render(){
    const savedWords = this.props.sideBar.savedWords;
    return(
      <div>
        <SavedWords savedWords={savedWords} handleDelete={this.handleDelete} updateHighlightWord={this.updateHighlightWord}/>
      </div>
    )
  }
}


const mapStateToProps = state => (
  {
    userId: state.auth.user.id,
    stories: state.stories,
    sideBar: state.sideBar
  }
)

const mapDispatchToProps = ({
  getSavedWords,
  deleteSavedWord,
  updateSavedWords,
    updateHighlightedWord
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedWordsContainer);