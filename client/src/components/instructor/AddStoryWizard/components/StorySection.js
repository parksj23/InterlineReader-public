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
import {addToStory, addStoryInfo,handleStatusClose} from '../../../../actions/instructor';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import StatusMessage from '../../../common/statusMessage/statusMessage';

const styleProperties = {
  "text-align": "textAlign",
  "font-family": "fontFamily",
  "font-size": "fontSize"
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
    value: "hanmun",
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
    let textToSend = [];
    let order_id = 1;
    let styleArr = []

    stringToSave = stringToSave.replace(/&lt;/ugi, "<").replace(/&gt;/ugi, ">").replace(/(&amp;|&*nbsp;)/ugi, "");

    if(this.doesStoryExist(this.state.storyForm).length > 0){
      //Warning
      console.log("Story Exist!")
    }
    else {
      if(this.state.language !== "ENGSH") {
        stringToSave = stringToSave.replace(/(<br>)/ugi, "\\n")
        // Grab all text within <p> tags
        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {

          //Grab all styles within tag
          ci.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            let styles = c2.split(";")
            styles.map(aStyleProp => {
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
          let finalText = cleanLine.filter(segment => segment !== " ").join(" ").replace(/([\u3131-\uD79D]\s[^\w\s|^\u3131-\uD79D])/ugi, (match, c4)=>{
            return c4.replace(/\s+/, "").trim()
          })

          // handle whitespace around quotations
          finalText = finalText.replace(/[\s]"\s/ugi, (match, c5)=>{
            return ' "'
          })

          textToSend.push({
            text: finalText,
            order_id,
            style: styleObj
          })
          order_id++
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
            lineSegment["text"] = c3.replace(/(&amp;|[&*]nbsp;)/ugi, "");
            lineSegment["order_id"] = order_id
            order_id++
          })
          textToSend.push(lineSegment)
        })
      }
      let createdDate = new Date()
      let storyForm = this.props.storyForm;
      storyForm["instructor"]= this.props.instructorId
      storyForm.language = this.state.language;
      storyForm.createdDate = createdDate;
      storyForm.lastUpdated = createdDate
      console.log(storyForm)
      this.props.addStoryInfo(storyForm);
      //this.props.addToStory(textToSend, this.props.storyForm); 
    }
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  handleOnChangeField = name => event => {
    let language = null;
      language = languages.find(function(aLanguage,index){
        return(aLanguage.value === event.target.value)
      })
    this.setState({
      language: language && language.value
    })
  }

  doesStoryExist = (storyInfo) => {
    let {instructor} = this.props;
    if(!instructor.storyList) return false;
    return instructor.storyList.filter(aStory =>{
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
      <div className={'addStoryContainer'}>
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
              { tabValue === 0 ?
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
                  <Grid item xs={12} /> 
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
                          }} /> : this.state.language === "MODKR" ?
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
                              options: ['NanumBarunGothic YetHangul','Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                              className: undefined,
                              component: undefined,
                              dropdownClassName: undefined,
                            }
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
                                options: ['NanumBarunGothic YetHangul','Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                              }
                            }}
                          />

                    }
                  </div>
              </Grid> :
              <div style={{overflow: 'scroll'}}>
                <div>
                  <h2>Preview {this.state.language  ? " - " + this.state.language : ""}</h2>
                </div>
                <Divider/>
                <div style={{overflow: 'hidden'}}>
                  <div className={'preview-container'}>
                    {ReactHtmlParser(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                  </div>
                </div>
              </div>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(StorySection);