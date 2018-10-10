import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import Sonagi from './Sonagi/Sonagi';
import SideBar from '../common/sideBar/sideBar';
import {getVocabforStory, initStory} from '../../actions/stories';
import {getListOfSavedWords, getSavedWords} from "../../actions/sideBar";


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
    if(this.props.stories.vocabList !== prevProps.stories.vocabList)
      this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, this.props.stories.vocabList.vocabList)
  }


  render() {
    const {storyTitle} = this.state;
    const {stories, vocab} = this.props;
    let searchWord = null;

    if(vocab && vocab.highlightedWord){
      if(this.state.language === 'korean') {
        searchWord = vocab.highlightedWord.korean
      }
      else {
        searchWord = vocab.highlightedWord.english
      }
    }
    //let story = require(`/${storyTitle}/${storyTitle}`)
    return (
      <div>
        <SideBar vocab={stories.vocab} grammar={stories.grammar} story={storyTitle}/>
        <Grid container style={stories.isSideBarOpen ? {marginLeft: "32%", width:"68%"} : null}>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <Paper elevation={1}>
            <Grid container>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={10}>
                <Sonagi language={this.state.language} searchWord={searchWord}/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={this.handleTranslate}>Translate</Button>
        </Grid>

      </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    stories: state.stories,
    vocab: state.vocab,
    userId: state.auth.user.id
  }
)

const mapDispatchToProps = ({getVocabforStory, getListOfSavedWords,initStory, getSavedWords})

export default connect(mapStateToProps, mapDispatchToProps)(Stories);