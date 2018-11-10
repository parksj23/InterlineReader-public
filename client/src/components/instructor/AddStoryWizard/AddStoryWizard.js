import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style/AddStoryWizard.css';
import Button from '@material-ui/core/Button'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';




class AddStoryWizard extends Component {
  constructor(props){
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render(){
    const {editorState} = this.state;

    return (
      <div className={'addStoryContainer'}>
        <div style={{paddingLeft: "12px", display: "flex", borderBottom: "solid 1px #000"}}>
          <Grid container style={{marginTop: "12px"}}>
            <Grid item xs={3}>
              <h3 style={{float: "left"}}>ADD STORY</h3>
            </Grid>
            <Grid item xs={7}/>
            <Grid item xs={2}>
              <Button style={{float: "right"}}>Save</Button>
            </Grid>

          </Grid>
        </div>

        <div className={'section-wrapper'} style={{display: "flex", paddingBottom: '12px'}}>
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
          <Divider style={{margin: "15px"}}/>
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

      </div>


    )


  }


}

export default AddStoryWizard;