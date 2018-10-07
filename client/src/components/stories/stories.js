import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import ReactHTMLParser from "react-html-parser";
import Sonagi from './Sonagi/Sonagi';
import SideBar from '../common/sideBar/sideBar';
import {getVocabforStory} from '../../actions/stories';






class Stories extends Component {

  state = {
    applicationDescription: "",
    storyTitle: "",
    language: "korean"
  }

  componentWillMount() {
    let pathname = this.props.location.pathname;
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1)
    this.props.getVocabforStory(storyTitle);
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
    if(this.props.vocab.highlightedWord !== prevProps.vocab.highlightedWord)
      console.log("new highlighted word: " + this.props.vocab.highlightedWord)
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
    console.log(searchWord)
    //let story = require(`/${storyTitle}/${storyTitle}`)
    return (
      <div>
        <SideBar vocab={stories.vocab} grammar={stories.grammar}/>
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
    vocab: state.vocab
  }
)

const mapDispatchToProps = ({getVocabforStory})

export default connect(mapStateToProps, mapDispatchToProps)(Stories);