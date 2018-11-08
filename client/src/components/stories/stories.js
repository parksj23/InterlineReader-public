import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import Sonagi from './Sonagi/Sonagi';
import Almaden from './Almaden/Almaden';
import Poktekpang from './Poktekpang/Poktekpang';
import {getVocabforStory, initStory, leaveStories} from '../../actions/stories';
import {getListOfSavedWords, getSavedWords} from "../../actions/sideBar";
import './styles/stories.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Stories extends Component {

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

  renderStoryText = () => {
    const { vocab, stories} = this.props;
    console.log(vocab);
    let searchWord = "";
    let storyTitle = stories.storyTitle;
    if (vocab && vocab.highlightedWord && vocab.kind === "vocab") {
      if (this.state.language === 'korean') {
        console.log("entered")
        searchWord = vocab.highlightedWord.korean
      }
      else {
        console.log("entered2")
        searchWord = vocab.highlightedWord.english
      }
    } else if (vocab && vocab.highlightedWord && vocab.kind === "grammar") {
      searchWord = vocab.highlightedWord;
    }
    switch (storyTitle) {
      case 'sonagi':
        return <Sonagi language={this.state.language} searchWord={searchWord}/>
      break;
      case 'almaden':
        return <Almaden language={this.state.language} searchWord={searchWord}/>
      case 'poktekpang':
        return <Poktekpang language={this.state.language} searchWord={searchWord}/>
    }
  }

  render() {
    const {sideBar} = this.props;
    return (
      <div>
        <Paper elevation={1} style={sideBar.isSideBarOpen ? {marginLeft: sideBar.drawerSize.width+ "px"} : null}>
          {this.renderStoryText()}
        </Paper>
        <div className='translateContainer'>
          <Button variant="contained" className={'translateButton'} classes={{containedPrimary: 'translateButton'}} color="primary" aria-label="Translate" onClick={this.handleTranslate}>Translate</Button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stories);