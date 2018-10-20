import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import Sonagi from './Sonagi/Sonagi';
import {getVocabforStory, initStory, leaveStories} from '../../actions/stories';
import {getListOfSavedWords, getSavedWords} from "../../actions/sideBar";
import './styles/stories.css';

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

  render() {
    const { vocab,sideBar} = this.props;
    let searchWord = "";
    if (vocab && vocab.highlightedWord) {
      if (this.state.language === 'korean') {
        searchWord = vocab.highlightedWord.korean
      }
      else {
        searchWord = vocab.highlightedWord.english
      }
    }
    return (
      <div>
        <Paper elevation={1} style={sideBar.isSideBarOpen ? {marginLeft: sideBar.drawerSize.width+ "px"} : null}>
          <Sonagi language={this.state.language} searchWord={searchWord ? searchWord : ""}/>
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