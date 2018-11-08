import React, {Component} from "react";
import {connect} from "react-redux";
import {getSavedWords, deleteSavedWord, updateSavedWords} from "../../../../../actions/sideBar";
import SavedWords from './SavedWords';

class SavedWordsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
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

  handleDelete = (vocabWord) => {
    let vocabList = this.props.stories.vocabList.vocabList;
    if(vocabList.indexOf(vocabWord.order_id) !== -1){
      this.props.deleteSavedWord(vocabWord);
      this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, this.props.stories.vocabList.vocabList)
    }



  }

  render(){
    const savedWords = this.props.savedWords;
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
    savedWords: state.sideBar.savedWords,
    stories: state.stories
  }
)

const mapDispatchToProps = ({
  getSavedWords,
  deleteSavedWord,
  updateSavedWords
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedWordsContainer);