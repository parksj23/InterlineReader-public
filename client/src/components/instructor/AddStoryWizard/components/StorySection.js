/*TODO: disable save button if story already exist in database
  TODO: Extend preview screen to fit entire window
  TODO: Create another preview tab so user cans witch between english and korean previews
  TODO: Cleanly unmount componeont
*/

import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../style/AddStoryWizard.css';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import {addToStory, addStoryInfo, handleStatusClose} from '../../../../actions/instructor';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import StatusMessage from '../../../common/statusMessage/statusMessage';
import '../style/StorySection.css'

const styleProperties = {
  "text-align": "textAlign",
  "font-family": "fontFamily",
  "font-size": "fontSize"
}

const editorStyleMap = {
  "fontFamily:": "source-han-serif-korean"
}

const languages = [
  {
    value: "MODKR",
    label: "Modern Korean"
  },
  {
    value: "ENGSH",
    label: "English"
  },
  {
    value: "MIDKR",
    label: "Middle Korean"
  },
  {
    value: "HANMN",
    label: "Hanmun Original"
  }
]

class StorySection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      tabValue: 0,
      previewLabel: "korean",
      openStatus: false,
      statusMessage: "",
      saveDisabled: true,
      language: "ENGSH"
    };

  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  handleOnSave = () => {
    let stringToSave = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).replace("<br/>", "\\n");
    let storyForm = this.props.storyForm;
    let textToSend = [];
    let order_id = 1;
    let styleArr = []

    stringToSave = stringToSave.replace(/&lt;/ugi, "<").replace(/&gt;/ugi, ">").replace(/(&amp;|&*nbsp;)/ugi, "");

    if (this.doesStoryExist(this.state.storyForm).length > 0) {
      //Warning
    }
    else {
      if (this.state.language !== "ENGSH") {
        stringToSave = stringToSave.replace(/(<br>)/ugi, "\\n")
        // Grab all text within <p> tags
        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {
          //Grab all styles within tag
          ci.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            console.log(c2)
            let styles = c2.split(";")
            styles.forEach(function (aStyleProp) {
              let propArr = aStyleProp.split(':');
              let prop = {};
              prop[styleProperties[propArr[0]]] = propArr[1]
              styleArr.push(prop)
            })
          })
          let cleanLine = [];
          //grab all text within <span> tag
          ci.replace(/<span\b[^>]*>(.+?)<\/span>/ugi, (match, c3) => {
            cleanLine.push(c3.replace("\\n", ""))
          })

          let styleObj = styleArr.reduce(function (acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
          }, {});

          //join array with spaces, then capture all segments where a whtiespace from joining is not needed
          // such as a comma or period
          let finalText = cleanLine.filter(segment => segment !== " ").join(" ").replace(/([\u3131-\uD79D]\s[^\w\s|^\u3131-\uD79D])/ugi, (match, c4) => {
            return c4.replace(/\s+/, "").trim()
          })
          // handle whitespace around quotations
          finalText = finalText.replace(/[\s]"\s/ugi, (match, c5) => {
            return ' "'
          })

          textToSend.push({
            text: finalText,
            order_id,
            style: styleObj,
            language: this.state.language
          })
          order_id++
        })
      }
      else {
        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {
          let lineSegment = {};
          match.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            let styles = c2.split(";")
            styles.forEach(function (aStyleProp) {
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
            lineSegment["text"] = c3.replace(/(&amp;|[&*]nbsp;)/ugi, "");
            lineSegment["order_id"] = order_id
            order_id++
          })
          textToSend.push({
            ...lineSegment,
            language: this.state.language
          })
        })
      }
      let createdDate = new Date()
      storyForm["instructor"] = this.props.auth.user.id
      storyForm.language = this.state.language;
      storyForm.createdDate = createdDate;
      storyForm.lastUpdated = createdDate

      if(textToSend.length > 0) {
        this.props.addStoryInfo(storyForm);
        this.props.addToStory(textToSend, storyForm);
      }
    }
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  handleOnChangeField = name => event => {
    let language = null;
    language = languages.find(function (aLanguage, index) {
      return (aLanguage.value === event.target.value)
    })
    this.setState({
      language: language && language.value,
      editorState: EditorState.createEmpty()
    })
  }

  doesStoryExist = (storyInfo) => {
    let {instructor} = this.props;
    if (!instructor.storyLists) return false;
    return instructor.storyLists.filter(aStory => {
      return (
        storyInfo === aStory
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
      <div style={{marginBottom: "56px", width: "100%"}}>
        <Grid container>
          <Grid item xs={2}/>
          <Grid item xs={8}>
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
          {
            <Grid item xs={2}>
              <Button key={this.props.key}
                      className={'story-section-save-button'}
                      style={{float: "right"}}
                      onClick={() => this.handleOnSave()}
                      disabled={false}>Save
              </Button>
            </Grid>
          }
        </Grid>
        {tabValue === 0 ?
          <Grid container>
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
              <Grid item xs={12}/>
            </Grid>
            <Grid item xs={9}>
              <div style={{
                display: "flex",
                "textAlign": "center",
                justifyContent: "center",
                height: "100%",
                flexDirection: "column"
              }}>
                <p style={{color: "red", fontSize: "1em", fontWeight: "bold"}}>For Modern Korean stories please make sure
                  "Source-Han-Serif-Korean" is selected from the font family BEFORE Copy & Pasting or typing text</p>
              </div>
            </Grid>
            <div>
              {
                this.state.language === "ENGSH" ?
                  <Editor
                    editorState={editorState}
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{
                      locale: 'ko',
                    }}
                    handlePastedText={(text, html, editorState) => {
                      return false
                    }}/> : this.state.language === "MODKR" ?
                  <Editor
                    editorState={editorState}
                    wrapperClassName="editor-wrapper wrapper-editor-modkr"
                    editorClassName="editor-editor"
                    customStyleMap={editorStyleMap}
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{
                      locale: 'ko',
                    }}
                    toolbar={{
                      fontFamily: {
                        options: ['source-han-serif-korean', 'NanumBarunGothic YetHangul'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      }

                    }}
                    editorStyle={{
                      fontFamily: "source-han-serif-korean !important"
                    }}
                  /> : this.state.language === "MIDKR" ?
                    <Editor
                      editorState={editorState}
                      wrapperClassName="editor-wrapper"
                      editorClassName="editor-editor"
                      onEditorStateChange={this.onEditorStateChange}
                      localization={{
                        locale: 'ko',
                      }}
                      toolbar={{
                        fontFamily: {
                          options: ['NanumBarunGothic YetHangul'],
                          className: undefined,
                          component: undefined,
                          dropdownClassName: undefined,
                        }
                      }}
                    /> :
                    <Editor
                      editorState={editorState}
                      wrapperClassName="editor-wrapper"
                      editorClassName="editor-editor"
                      onEditorStateChange={this.onEditorStateChange}
                      localization={{
                        locale: 'ko',
                      }}
                      toolbar={{
                        fontFamily: {
                          options: ['NanumBarunGothic YetHangul', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                          className: undefined,
                          component: undefined,
                          dropdownClassName: undefined,
                        }
                      }}
                    />


              }
            </div>
          </Grid> :
          <Grid container>
            <Grid item xs={12}>
              <div style={{overflow: 'scroll', width: "100%"}}>
                <h2>Preview {this.state.language ? " - " + this.state.language : ""}</h2>
                <Divider style={{color: "black", height: "8px"}}/>
              </div>
            </Grid>
            <div className={'preview-container'} style={{overflow: 'hidden', minWidth: "100%"}}>
              {ReactHtmlParser(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
            </div>
          </Grid>
        }
        <StatusMessage status="success"
                       open={this.props.instructor.addNewStory}
                       message={this.props.instructor.addNewStoryMessage}
                       handleClose={this.props.handleStatusClose}/>
        <Divider/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  instructor: state.instructor,
  auth: state.auth
});

const mapDispatchToProps = ({
  addToStory,
  addStoryInfo,
  handleStatusClose
})

export default connect(mapStateToProps, mapDispatchToProps)(StorySection);