import React, {Component} from "react";
import {connect} from "react-redux";
import {getVocabforStory, initStory, leaveStories} from '../../actions/stories';
import {getListOfSavedWords, getSavedWords} from "../../actions/sideBar";
import './styles/stories.css';
import Story from './components/story';
import SideBar from '../common/sideBar/sideBarContainer'
import ContentLoader, { Facebook } from 'react-content-loader'

class StoriesContainer extends Component {

  state = {
    applicationDescription: "",
    storyTitle: "",
    language: "korean"
  }

  componentWillMount() {
    let pathname = this.props.location.pathname;
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1);
    this.props.initStory(storyTitle);
    this.props.getVocabforStory(storyTitle);
    this.props.getListOfSavedWords(this.props.userId, storyTitle)
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
    this.props.leaveStories();
  }

  render() {
    const {sideBar, stories, vocab} = this.props;
    let text;
    let searchWord = "";
    if(this.state.language === 'korean') {
      text = stories.storyTextKorn
      searchWord = vocab.highlightedWord.korean
    }
    else {
      text = stories.storyTextEngl
      searchWord = vocab.highlightedWord.english
    }
    return (
      <div className={'story-container'}>
        <SideBar vocab={stories.vocab} grammar={stories.grammar} story={stories.storyTitle} onResize={this.onResize}/>
        {text === undefined? 
          <ContentLoader
            height={700}
            width={800}
            speed={1}
            primaryColor="#F4F5F6"
            secondaryColor="#ececf1"> 
            <rect x="0" y="0" rx="3" ry="3" width="10%" height="13" />
            <rect x="75%" y="0" rx="3" ry="3" width="25%" height="13" />
            <rect x="0" y="30" rx="3" ry="3" width="30%" height="10" />
            <rect x="32%" y="30" rx="3" ry="3" width="55%" height="10" />
            <rect x="89%" y="30" rx="3" ry="3" width="10%" height="10" />
            <rect x="0" y="60" rx="3" ry="3" width="30%" height="10" />
            <rect x="32%" y="60" rx="3" ry="3" width="55%" height="10" />
            <rect x="89%" y="60" rx="3" ry="3" width="10%" height="10" />
            <rect x="0" y="90" rx="3" ry="3" width="30%" height="10" />
            <rect x="32%" y="90" rx="3" ry="3" width="55%" height="10" />
            <rect x="89%" y="90" rx="3" ry="3" width="10%" height="10" />
            <rect x="0" y="130" rx="3" ry="3" width="100%" height="10" />
          </ContentLoader>
          : <Story text={text} searchWord={searchWord} sideBar={sideBar} handleTranslate={this.handleTranslate}/>}
        
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    stories: state.stories,
    vocab: state.vocab,
    userId: state.auth.user.id,
    sideBar: state.sideBar
  }
)

const mapDispatchToProps = ({getVocabforStory, getListOfSavedWords, initStory, getSavedWords, leaveStories})

export default connect(mapStateToProps, mapDispatchToProps)(StoriesContainer);