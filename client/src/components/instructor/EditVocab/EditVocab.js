import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  initEditVocab,
  updateSelectedVocab,
  updateUserHighlightedText,
  clearSelectedVocab,
  startUpdatingHighlightedText,
  updateVocab, deleteVocab
} from "../../../actions/instructor";
import StoryTextContainer from './StoryTextContainer/StoryTextContainer';
import EditVocabFormContainer from './EditVocabFormContainer/EditVocabFormContainer';
import NewVocabFormContainer from './EditVocabFormContainer/NewVocabFormContainer'
import './EditVocab.css';

import Grid from '@material-ui/core/Grid';

class EditVocab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storyName: null,
      userHighlightedText: null
    }
    this.handleSelectHighlight.bind(this)
    this.handleUserHighlightText.bind(this)
  }

  componentWillMount() {
    let {storyName} = this.props.match.params
    this.props.initEditVocab(storyName);
  }

   componentWillUnmount(){
   }

  handleSelectHighlight = (selectedText) => {
    let selectedVocabInfo = this.props.editVocab.vocabSearch[selectedText]
    this.props.updateSelectedVocab(selectedVocabInfo);
  }

  handleUserHighlightText = () => {
    let text = null;
    if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
      this.props.updateUserHighlightedText(text);
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
      this.props.updateUserHighlightedText(text);
    }
  }

  render() {
    let vocabSearch = this.props.editVocab && this.props.editVocab.vocabSearch ? new RegExp(Object.keys(this.props.editVocab.vocabSearch).join("|")) : null;
    let {editVocab} = this.props
    return (
      <div className="edit-Vocabulary">
        <Grid container>
          <Grid item xs={6}>{
            this.props.editVocab && this.props.editVocab.storyInfo && !this.props.editVocab.highlightTextUpdating  ?
              <StoryTextContainer
                text={this.props.editVocab.storyTextKorn}
                searchWord={vocabSearch}
                handleSelectHighlight={this.handleSelectHighlight}
                updateUserHighlightedText={this.props.updateUserHighlightedText}
                startUpdatingHighlightedText={this.props.startUpdatingHighlightedText}
                editVocab={this.props.editVocab}
              /> : null
          }
          </Grid>
          <Grid item xs={6}>
            {
              editVocab.selectedVocab && !this.props.editVocab.editVocabUpdating ?
                <EditVocabFormContainer
                  vocabList={this.props.editVocab.vocabList}
                  selectedVocab={editVocab.selectedVocab}
                  storyTitle={this.props.editVocab.storyTitle}
                  updateVocab={this.props.updateVocab}
                  deleteVocab={this.props.deleteVocab}

                /> : null
            }
            {
              this.props.editVocab.userHighlightedText && !this.props.editVocab.highlightTextUpdating ?
                <NewVocabFormContainer
                  editVocab={this.props.editVocab}
                  userHighlightedText={this.props.editVocab.userHighlightedText}
                  storyTitle={this.props.editVocab.storyTitle}
                /> : null
            }
          </Grid>
        </Grid>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  editVocab: state.instructor.editVocab
});

const mapDispatchToProps = ({
  initEditVocab,
  updateSelectedVocab,
  updateUserHighlightedText,
  clearSelectedVocab,
  startUpdatingHighlightedText,
  updateVocab,
  deleteVocab
})

export default connect(mapStateToProps, mapDispatchToProps)(EditVocab);
