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
      storyForm: {
        authorKorn: "",
        authorRom: "",
        titleKorn: "",
        titleRom: "",
        titleEng: "",
        storyName: "",
        class: "410B",
        language: "korean",
      },
      openStatus: false,
      statusMessage: "",
      saveDisabled: true
    };
  }

  onEditorStateChange = (editorState) => {

    this.setState({
      editorState,
      saveDisabled: this.checkDisabled(this.state.storyForm) || !editorState.getCurrentContent().hasText()
    });
  };

  checkDisabled = (storyForm) => {
    let keys = Object.keys(storyForm)
    for(let aKey of keys){
      if (!storyForm[aKey]){
        return true
      }
    }
    return false
  }

  handleOnSave = () => {
    let stringToSave = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).replace("<br/>", "\\n");
    let textToSend = [];
    let order_id = 1;
    let styleArr = []

    if(this.doesStoryExist(this.state.storyForm).length > 0){
      //Warning
      console.log("Story Exist!")
    }
    else {
      if(this.state.storyForm.language !== "english") {
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
            lineSegment["order_id"] = order_id
            order_id++
          })
          textToSend.push(lineSegment)
        })
      }
      this.props.addToStory(textToSend, this.state.storyForm);
      this.props.addStoryInfo(this.state.storyForm);
    }
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  handleOnChangeField = name => event => {
    let storyForm = this.state.storyForm;
    storyForm[name] = event.target.value
    if(name ==="titleRom") {
      storyForm["storyName"] = event.target.value
    }
    this.setState({
      storyForm,
      saveDisabled: this.checkDisabled(storyForm) || this.state.editorState.getCurrentContent().hasText()

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
        <div style={{paddingLeft: "12px", display: "flex", borderBottom: "solid 1px #000"}}>
          <Grid container style={{marginTop: "12px"}}>
            <Grid item xs={3}>
              <h3 style={{float: "left"}}>ADD STORY</h3>
            </Grid>
            <Grid item xs={7}/>
            <Grid item xs={2}>
              <Button style={{float: "right"}} onClick={() => this.handleOnSave()} disabled={this.state.saveDisabled}>Save</Button>
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
                    onChange={this.handleOnChangeField("titleKorn")}
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
                    onChange={this.handleOnChangeField("authorKorn")}
                    style={{whiteSpace: "noWrap"}}
                  />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                  <TextField
                    id="story-class"
                    select
                    label="Class"
                    value={this.state.storyForm.class}
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
                    onChange={this.handleOnChangeField("titleRom")}
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
                    onChange={this.handleOnChangeField("authorRom")}
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
                    onChange={this.handleOnChangeField("titleEng")}
                    style={{whiteSpace: "noWrap"}}

                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="story-language"
                    select
                    label="Language"
                    value={this.state.storyForm.language}
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