import React, {Component} from "react";
import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../../../actions/vocab';
import {addSavedWord, updateSavedWords, addToSavedWords} from "../../../../../actions/sideBar";
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
      this.props.addWord('success');
    }
  }

  updateHighlightWord = (vocabWord, type) =>{
    this.props.updateHighlightedWord(vocabWord, type)

  }

  componentWillUnmount(){
    if(this.props.stories.vocabList) {
      let vocabList = this.props.stories.vocabList.vocabList;
      let params = {
        userId: this.props.userId,
        storyTitle: this.props.stories.storyTitle,
        vocabList
      }
      //this.props.updateSavedWords(params);
    }
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