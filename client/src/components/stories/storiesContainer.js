import React, {Component} from "react";
import {connect} from "react-redux";
import {getVocabforStory, initStory, leaveStories, resetSTories, enableLoading, disableLoading} from '../../actions/stories';
import {
  getListOfSavedWords,
  getSavedWords,
  enableSideBarButton,
  resetSideBar,
  updateSavedWords,
} from "../../actions/sideBar";
import {disableSideBarButton} from '../../actions/dashboard';
import './styles/stories.css';
import Story from './components/story';
import SideBar from '../common/sideBar/sideBarContainer'
import { ClipLoader } from 'react-spinners';

class StoriesContainer extends Component {

  state = {
    applicationDescription: "",
    storyTitle: "",
    language: "korean",
    storyInfo: null
  }

  componentWillMount() {
    this.props.enableLoading();
    let pathname = this.props.location.pathname;
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1).trim();
    this.setState({
      storyTitle,
    })
  }

  componentDidMount() {
    let pathname = this.props.location.pathname;
    let paths = this.props.location.pathname.split("/")
    let storyClass = paths.includes("410A") ? "410A" : "410B";
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1).trim();
    this.props.initStory(storyTitle, storyClass).then(resp => {
      this.props.getListOfSavedWords(this.props.userId, storyTitle).then(resp => {
        this.props.enableSideBarButton();
        this.props.getSavedWords(this.props.userId, storyTitle, this.props.stories.vocabList.vocabList, storyClass).then(resp => {
          this.props.disableLoading();
        })
      })
    });
  }

  handleTranslate = () => {
    this.setState({
      language: this.state.language === 'korean' ? 'english' : 'korean'
    })
  }

  componentWillUnmount() {
    let vocabList = this.props.stories.vocabList.vocabList;
    let params = {
      userId: this.props.userId,
      storyTitle: this.props.stories.storyTitle,
      vocabList
    }
    this.props.updateSavedWords(params);
    this.props.leaveStories();
    this.props.resetSTories();
    this.props.resetSideBar();
    this.props.disableSideBarButton();

  }

  render() {
    const {sideBar, stories, vocab} = this.props;
    let text;
    let searchWord = null;
    let title = "";
    let author = "";
    if (this.state.language === 'korean') {
      text = stories.storyTextKorn
      searchWord = vocab.highlightedWord
      if (stories.storyInfo) {
        title = stories.storyInfo.titleKorn;
        author = stories.storyInfo.authorKorn
      }
    }
    else {
      text = stories.storyTextEngl
      searchWord = vocab.highlightedWord

      if (stories.storyInfo) {
        title = stories.storyInfo.titleEng
        author = stories.storyInfo.authorRom
      }
    }
    return (
      <div className={'story-container'}>
        <div style={{top: "40vh", left: "45%", position: "absolute", display: "flex"}}>
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={'#36D7B7'}
            loading={this.props.stories.isStoryLoading}
          />
        </div>
        <div>
          {this.props.stories.storyInfo ?
            <SideBar vocab={stories.vocab} grammar={stories.grammar} story={stories.storyTitle}
                     onResize={this.onResize}/> : null
          }
        </div>
        {stories.storyInfo ?
          <Story title={title} author={author} text={text} searchWord={searchWord} sideBar={sideBar}
                 handleTranslate={this.handleTranslate}/> : null}
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
    dashboard: state.dashboard
  }
)

const mapDispatchToProps = ({
  getVocabforStory, getListOfSavedWords, initStory,
  getSavedWords, leaveStories, enableSideBarButton, resetSTories, resetSideBar,
  disableSideBarButton, updateSavedWords,enableLoading, disableLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(StoriesContainer);