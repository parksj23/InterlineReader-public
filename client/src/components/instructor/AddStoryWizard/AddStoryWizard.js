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
import {addToStory, changeSelectedMenu} from '../../../actions/instructor';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styleProperties = {
  "text-align": "textAlign",
  "font-family": "fontFamily",
  "font-size": "fontSize"


}

class AddStoryWizard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      tabValue: 0,
      storyTitle: "",
      storyAuth: ""
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
    this.props.addToStory(textToSend, "korean");
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  handleOnChangeField = name => event => {
    this.setState({
      [name]: event.target.value
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
                    required
                    id="class"
                    label="Class"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleOnChangeField("class")}
                    style={{whiteSpace: "noWrap"}}
                  />
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
                    onChange={this.handleOnChangeField("storyClassEnglish")}
                    style={{whiteSpace: "noWrap"}}

                  />
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
      </div>


    )


  }


}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
  addToStory
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryWizard);