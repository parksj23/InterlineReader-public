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
  }

  componentWillMount() {
    let {storyName} = this.props.match.params
    this.props.initEditVocab(storyName);
  }

   componentWillUnmount(){
   }

  handleSelectHighlight = (selectedText) => {
    let selectedVocabInfo = this.props.editVocab.MODKR.vocabSearch[selectedText]
    this.props.updateSelectedVocab(selectedVocabInfo);
  }

  render() {
    let vocabSearch = this.props.editVocab && this.props.editVocab.MODKR 
        && this.props.editVocab.MODKR.vocabSearch ? new RegExp(Object.keys(this.props.editVocab.MODKR.vocabSearch).join("|")) : null;
    let {editVocab} = this.props
    return (
      <div className="edit-Vocabulary">
        <Grid container>
          <Grid item xs={6}>{
            this.props.editVocab && this.props.editVocab.storyInfo && !this.props.editVocab.highlightTextUpdating  ?
              <StoryTextContainer
                text={this.props.editVocab.MODKR.storyText}
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
                  storyTitle={this.props.editVocab.storyInfo.storyName}
                  updateVocab={this.props.updateVocab}
                  deleteVocab={this.props.deleteVocab}

                /> : null
            }
            {
              this.props.editVocab.userHighlightedText && !this.props.editVocab.highlightTextUpdating ?
                <NewVocabFormContainer
                  editVocab={this.props.editVocab}
                  userHighlightedText={this.props.editVocab.userHighlightedText}
                  storyTitle={this.props.editVocab.storyInfo.storyName}
                /> : null
            }
          </Grid>
        </Grid>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  editVocab: state.instructor.editVocab,
  stories: state.stories
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
