import React, {Component} from "react";
import {connect} from "react-redux";
import {getVocabforStory, initStory, leaveStories} from '../../actions/stories';
import {getListOfSavedWords, getSavedWords, updateSavedWords} from "../../actions/sideBar";
import './styles/stories.css';
import Story from './components/story';
import SideBar from '../common/sideBar/sideBarContainer'
import ContentLoader, { Facebook } from 'react-content-loader'

class StoriesContainer extends Component {

  state = {
    applicationDescription: "",
    storyTitle: "",
    language: "korean",
    storyInfo: null
  }

  componentWillMount() {
    console.log("Component mounting")
    let pathname = this.props.location.pathname;

    let paths = this.props.location.pathname.split("/")

    let storyClass = paths.includes("410A") ? "410A" : "410B";
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1).trim();
    console.log(storyTitle)
      this.props.initStory(storyTitle, storyClass);
     /* this.props.getVocabforStory(storyTitle,storyInfo);
      this.props.getListOfSavedWords(this.props.userId, storyTitle)*/
      this.setState({
        storyTitle,
      })
  }

  componentDidMount() {
  }

  handleTranslate = () => {
    this.setState({
      language: this.state.language === 'korean' ? 'english' : 'korean'
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.stories.vocabList !== prevProps.stories.vocabList)
      this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, this.props.stories.vocabList.vocabList)
  }

  componentWillUnmount() {
   /* if(this.props.stories.vocabList) {
      let vocabList = this.props.stories.vocabList.vocabList;


      let params = {
        userId: this.props.userId,
        storyTitle: this.props.stories.storyTitle,
        vocabList
      }
      this.props.updateSavedWords(params);
    }*/
    console.log("component unmounting")
    this.props.leaveStories();
  }

  render() {
    const {sideBar, stories, vocab} = this.props;
    let text;
    let searchWord = "";
    let title = "";
    let author ="";
      if (this.state.language === 'korean') {
        text = stories.storyTextKorn
        searchWord = vocab.kind==="grammar"? vocab.highlightedWord: vocab.highlightedWord.korean

        if(stories.storyInfo){
          title = stories.storyInfo.titleKorn;
          author = stories.storyInfo.authorKorn
        }
      }
      else {
        text = stories.storyTextEngl
        searchWord = vocab.highlightedWord.english

        if(stories.storyInfo){
          title = stories.storyInfo.titleEng
          author = stories.storyInfo.authorRom
        }
      }
      return (
        <div className={'story-container'}>
          <div>
            {this.props.stories.storyInfo ? <SideBar vocab={stories.vocab} grammar={stories.grammar} story={stories.storyTitle}
                      onResize={this.onResize}/> : null
            }
          </div>
          {stories.storyInfo ?
            <Story title={title} author={author} text={text} searchWord={searchWord} sideBar={sideBar}
                                      handleTranslate={this.handleTranslate}/>: null}
          </div>
      );
  }
}

const mapStateToProps = state => (
  {
    stories: state.stories,
    vocab: state.vocab,
    userId: state.auth.user.id,
    sideBar: state.sideBar,
    kind: state.kind,
    dashboard: state.dashboard
  }
)

const mapDispatchToProps = ({getVocabforStory, getListOfSavedWords, initStory, getSavedWords, leaveStories, updateSavedWords})

export default connect(mapStateToProps, mapDispatchToProps)(StoriesContainer);