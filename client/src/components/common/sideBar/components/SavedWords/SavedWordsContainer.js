import React, {Component} from "react";
import {connect} from "react-redux";
import {getSavedWords, deleteSavedWord, updateSavedWords} from "../../../../../actions/sideBar";
import SavedWords from './SavedWords';

class SavedWordsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, this.props.stories.vocabList.vocabList, this.props.stories.storyInfo.class)

  }

  componentWillUnmount(){
    if(this.props.stories.vocabList) {
        let vocabList = this.props.stories.vocabList.vocabList;


        let params = {
          userId: this.props.userId,
          storyTitle: this.props.stories.storyTitle,
          vocabList
        }
        this.props.updateSavedWords(params);
      }
  }

  componentWillUpdate(prevProps){
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.props.stories.vocabList){
      return this.props.stories.vocabList.vocabList === nextProps.stories.vocabList.vocabList
    }
    return false
  }

  handleDelete = (vocabWord) => {
    let vocabList = this.props.stories.vocabList.vocabList;
    if(vocabList.indexOf(vocabWord.order_id) !== -1){
      this.props.deleteSavedWord(vocabWord);
      this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, this.props.stories.vocabList.vocabList,this.props.stories.storyInfo)
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