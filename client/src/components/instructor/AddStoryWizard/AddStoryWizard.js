/*TODO: disable save button if story already exist in database
  TODO: Extend preview screen to fit entire window
  TODO: Create another preview tab so user cans witch between english and korean previews
  TODO: Cleanly unmount componeont
*/


import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style/AddStoryWizard.css';
import Button from '@material-ui/core/Button'
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import {addToStory, changeSelectedMenu, addStoryInfo,handleStatusClose} from '../../../actions/instructor';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import StatusMessage from '../../common/statusMessage/statusMessage';


const styleProperties = {
  "text-align": "textAlign",
  "font-family": "fontFamily",
  "font-size": "fontSize"


}

const languages = [
{
  value: "korean",
    label: "Korean"
},
  {
    value: "english",
    label: "English"
  }
]

const classes = [
  {
    value: "410A",
    label: "410A"
  },
  {
    value: "410B",
    label: "410B"
  }

]

class AddStoryWizard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      tabValue: 0,
      storyTitle: "",
      storyAuthor: "",
      language: "korean",
      storyAuthorRomanize: "",
      storyNameRomanize: "",
      storyTitleEnglish: "",
      class: "410B",
      openStatus: false,
      statusMessage: ""
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleOnSave = () => {
    let stringToSave = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).replace("<br/>", "\\n");
    let textToSend = [];
    let order_id = 1;
    let styleArr = []
    let storyInfo = {
      "authorKorn": this.state.storyAuthor,
      "titleKorn": this.state.storyTitle,
      "authorRom": this.state.storyAuthorRomanize,
      "titleRom": this.state.storyNameRomanize,
      "titleEng": this.state.storyTitleEnglish,
      "storyName": this.state.storyNameRomanize,
      "class": this.state.class,
      "language": this.state.language
    }

    if(this.doesStoryExist(storyInfo).length > 0){
      //Warning
      console.log("Story Exist!")
    }
    else {
      if(this.state.language !== "english") {
        stringToSave = stringToSave.replace(/(<br>)/ugi, "\\n")

        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {
          ci.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            let styles = c2.split(";")
            styles.map(aStyleProp => {
              let propArr = aStyleProp.split(':');
              let prop = {};
              prop[styleProperties[propArr[0]]] = propArr[1]
              styleArr.push(prop)
            })
          })

          let styleObj = styleArr.reduce(function (acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
          }, {});
          ci.replace(/<span(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>(.+?)<\/span>/ugi, (matches, t) => {
            t.split("\\n").map(finalText => {
              textToSend.push({
                text: finalText,
                order_id,
                style: styleObj
              })
              order_id++
            })
          })

        })
      }
      else{
        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {
          let lineSegment = {};
          match.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            let styles = c2.split(";")
            styles.map(aStyleProp => {
              let propArr = aStyleProp.split(':');
              let prop = {};
              prop[styleProperties[propArr[0]]] = propArr[1]
              styleArr.push(prop)
            })
            let styleObj = styleArr.reduce(function (acc, x) {
              for (var key in x) acc[key] = x[key];
              return acc;
            }, {});
            lineSegment["style"] = styleObj
          })
          ci.replace(/>(.+)/ugi, (match, c3) => {
            lineSegment["text"] = c3
          })
          textToSend.push(lineSegment)
        })
        console.log(textToSend)
      }
      this.props.addToStory(textToSend, this.state.language, storyInfo);
      this.props.addStoryInfo(storyInfo);
    }
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  handleOnChangeField = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  doesStoryExist = (storyInfo) => {
    let {instructor} = this.props;
    console.log(storyInfo)
    return instructor.storyList.filter(aStory =>{
      console.log(aStory)
      return (
        storyInfo.authorKorn === aStory.authorKorn &&
          storyInfo.titleKorn === aStory.titleKorn &&
          storyInfo.authorRom === aStory.authorRom &&
          storyInfo.titleRom === aStory.titleRom &&
          storyInfo.titleEng === aStory.titleEng &&
          aStory[this.state.language] === true
      )
    })
  }

  handleStatusClose = () => {
    this.setState({
      openStatus: false
    })
  }

  render() {
    const {editorState, tabValue} = this.state;

    return (
      <div className={'addStoryContainer'}>
        <div style={{paddingLeft: "12px", display: "flex", borderBottom: "solid 1px #000"}}>
          <Grid container style={{marginTop: "12px"}}>
            <Grid item xs={3}>
              <h3 style={{float: "left"}}>ADD STORY</h3>
            </Grid>
            <Grid item xs={7}/>
            <Grid item xs={2}>
              <Button style={{float: "right"}} onClick={() => this.handleOnSave()}>Save</Button>
            </Grid>

          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={this.state.tabValue}
                onChange={this.handleOnChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="EDIT"/>
                <Tab label="PREVIEW"/>
              </Tabs>
            </Grid>
          </Grid>
          {
            tabValue === 0 ?
              <Grid container>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="story-name"
                    label="Story Title"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleOnChangeField("storyTitle")}
                    style={{whiteSpace: "noWrap"}}
                  />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="story-author"
                    label="Story Author"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleOnChangeField("storyAuthor")}
                    style={{whiteSpace: "noWrap"}}
                  />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                  <TextField
                    id="story-class"
                    select
                    label="Class"
                    value={this.state.class}
                    onChange={this.handleOnChangeField('class')}
                    margin="normal"
                    style={{width: "100%"}}
                  >
                    {classes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="story-name-romanization"
                    label="Story Name (Romanization)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleOnChangeField("storyNameRomanize")}
                    style={{whiteSpace: "noWrap"}}
                  />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="story-author-romanize"
                    label="Story Author (Romanization)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleOnChangeField("storyAuthorRomanize")}
                    style={{whiteSpace: "noWrap"}}
                  />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="story-title-english"
                    label="Story Title (English)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleOnChangeField("storyTitleEnglish")}
                    style={{whiteSpace: "noWrap"}}

                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="story-language"
                    select
                    label="Language"
                    value={this.state.language}
                    onChange={this.handleOnChangeField('language')}
                    helperText="Please select your Language"
                    margin="normal"
                  >
                    {languages.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <div>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="editor-wrapper"
                      editorClassName="editor-editor"
                      onEditorStateChange={this.onEditorStateChange}
                      localization={{
                        locale: 'ko',
                      }}
                      handlePastedText={(text, html, editorState) => {
                        console.log(text)
                        true
                      }}
                    />
                  </div>
                </Grid>
              </Grid> :
              <div style={{overflow: 'scroll'}}>
                <div>
                  <h2>Preview</h2>
                </div>
                <Divider/>
                <div style={{overflow: 'hidden'}}>
                  <div className={'preview-container'}>
                    {ReactHtmlParser(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                  </div>
                </div>
              </div>

          }
        </div>
        <StatusMessage status="success" open={this.props.instructor.addNewStory} message={this.props.instructor.addNewStoryMessage} handleClose={this.props.handleStatusClose}/>
      </div>


    )


  }


}

const mapStateToProps = state => ({
  instructor: state.instructor
});

const mapDispatchToProps = ({
  addToStory,
  addStoryInfo,
  handleStatusClose
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryWizard);