import React, {Component} from "react";
import {connect} from "react-redux";
import {getVocabforStory, initStory, leaveStories, resetSTories, enableLoading, disableLoading,saveHypothesisLink} from '../../actions/stories';
import {endGrammarSearchSession} from '../../actions/analytics'

import {
  getListOfSavedWords,
  getSavedWords,
  enableSideBarButton,
  resetSideBar,
  updateSavedWords
} from "../../actions/sideBar";
import {disableSideBarButton} from '../../actions/dashboard';
import './styles/stories.css';
import Story from './components/story';
import SideBar from '../common/sideBar/sideBarContainer'
import { ClipLoader } from 'react-spinners';
import Modal from '@material-ui/core/Modal'
import FlashCardsContainer from './components/common/FlashCard/FlashCardsContainer';
import story from "./components/story";

class StoriesContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      applicationDescription: "",
      storyTitle: "",
      selectedLanguage: "MODKR",
      storyInfo: null,
      showFlashCardModal: false,
      isSpeedDialOpen: false
    }
    this.handleTranslate.bind(this)
    this.handleFlashCards.bind(this)
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
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1).trim();

    let iframes = [].slice.apply(document.querySelectorAll('iframe'));
    for (let anIframe of iframes) {
      if (anIframe.src.startsWith("https://hypothes.is")) {
        anIframe.src = anIframe.src.split("&")[0]
      }
    }
    let storyInfo;
      this.props.initStory(storyTitle).then(resp => {
        storyInfo = resp.storyInfo
        this.props.getListOfSavedWords(this.props.userId, storyInfo._id).then(resp => {
          console.log(storyInfo)
          console.log(resp.savedVocabIds);
          this.props.enableSideBarButton();
          this.props.getSavedWords(this.props.userId, storyInfo._id, resp.savedVocabIds, this.props.stories.selectedLanguage).then(resp => {
            this.props.disableLoading();
          })
        })
    });
  }

  handleTranslate = (language) => {
    console.log(language)
    this.setState({
      selectedLanguage: language,
      isSpeedDialOpen: false
    })
  }

  handleOpenSpeedDial = () => {
    this.setState({
      isSpeedDialOpen: true
    })
  }

  handleCloseSpeedDial = () => {
    this.setState({
      isSpeedDialOpen: false
    })
  }

  handleFlashCards = () => {
    this.setState({
      showFlashCardModal: true,
      isSpeedDialOpen: false
    })
  }

  handleClose = () => {
    this.setState({
      showFlashCardModal: false
    })
  }

  componentWillUnmount() {
    let iframes = [].slice.apply(document.querySelectorAll('iframe'));
    let hypothesisURL ="";
    for (let anIframe of iframes) {
      if (anIframe.src.startsWith("https://hypothes.is")) {
        anIframe.src = anIframe.src.split("&")[0]
      }
    }
    let params = {
      userId: this.props.userId,
      storyId: this.props.stories.storyInfo._id,
      savedVocabIds: this.props.sideBar.savedVocabIds,
      savedWords: this.props.sideBar.savedWords
    }
    this.props.updateSavedWords(params);
    if(this.props.analytics.sessions.length > 0)this.props.endGrammarSearchSession();
    this.props.leaveStories();
    this.props.resetSTories(hypothesisURL.split("&")[0] + `&${Math.floor(Math.random()*100000)}`);
    this.props.resetSideBar();
    this.props.disableSideBarButton();
  }

  render() {
    const {sideBar, stories} = this.props;
    let iframes = [].slice.apply(document.querySelectorAll('iframe'));
    for (let anIframe of iframes) {
      if (anIframe.src.startsWith("https://hypothes.is")) {
        anIframe.src += "&";
        anIframe.src = anIframe.src.split("&")[0]
      }
    }
    let text;
    let vocab;
    let grammar;
    let searchWord = null;
    let title = "";
    let author = "";
    if(stories[this.state.selectedLanguage]) {
      text = stories[this.state.selectedLanguage].storyText
      vocab = stories[this.state.selectedLanguage].vocabList;
      grammar = stories[this.state.selectedLanguage].grammarList;
      switch(this.state.selectedLanguage){
        case 'MODKR':
          title = stories.storyInfo.titleKorn;
          author = stories.storyInfo.authorKorn;
          break;
        case 'ENGSH':
          title = stories.storyInfo.titleEng
          author = stories.storyInfo.authorRom
          break;
        case 'MIDKR':
          title = stories.storyInfo.titleKorn
          author = stories.storyInfo.authorKorn
          break;
        default:
          text = stories.storyTextHanmun
          searchWord = vocab.highlightedWord
          title = stories.storyInfo.titleKorn
          author = stories.storyInfo.authorKorn
      }
    }
    return (
      stories[this.state.selectedLanguage] ?
        <div className={'story-container'}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.showFlashCardModal}
          onClose={this.handleClose}
        >
          <FlashCardsContainer/>
        </Modal>

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
            <SideBar vocab={vocab} grammar={grammar} story={stories.storyTitle}
                     onResize={this.onResize}/> : null
          }
        </div>
        {stories.storyInfo ?
          <Story title={title} author={author} text={text} searchWord={searchWord} sideBar={sideBar} language={this.state.selectedLanguage} isSpeedDialOpen={this.state.isSpeedDialOpen}
                 handleTranslate={this.handleTranslate}
                 handleFlashCards={this.handleFlashCards}
                 handleOpenSpeedDial={this.handleOpenSpeedDial}
                 handleCloseSpeedDial={this.handleCloseSpeedDial}
          /> : null}
      </div>
        : null
    );
  }
}

const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id,
    sideBar: state.sideBar,
    dashboard: state.dashboard,
    analytics: state.analytics
  }
)

const mapDispatchToProps = ({
  getVocabforStory, getListOfSavedWords, initStory,
  getSavedWords, leaveStories, enableSideBarButton, resetSTories, resetSideBar,
  disableSideBarButton, updateSavedWords,enableLoading, disableLoading,saveHypothesisLink,
  endGrammarSearchSession
})

export default connect(mapStateToProps, mapDispatchToProps)(StoriesContainer);