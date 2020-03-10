import React, {Component} from "react";
import {connect} from "react-redux";
import {getSavedWords, deleteSavedWord, updateSavedWords} from "../../../../../actions/sideBar";
import SavedWords from './SavedWords';

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

  render(){
    const savedWords = this.props.sideBar.savedWords;
    return(
      <div>
        <SavedWords savedWords={savedWords} handleDelete={this.handleDelete}/>
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
  updateSavedWords
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedWordsContainer);