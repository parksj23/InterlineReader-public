import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  initEditVocab,
  updateSelectedVocab,
  updateUserHighlightedText,
  clearSelectedVocab,
  startUpdatingHighlightedText,
  updateVocab, deleteVocab, resetEditVocab
} from "../../../actions/KORN410/instructor";
import StoryTextContainer from './StoryTextContainer/StoryTextContainer';
import EditVocabFormContainer from './EditVocabFormContainer/EditVocabFormContainer';
import NewVocabFormContainer from './EditVocabFormContainer/NewVocabFormContainer'
import './EditVocab.css';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    let urlSegments = this.props.history.location.pathname.split("/")
    let storyName = urlSegments[urlSegments.length-1]
    this.props.initEditVocab(storyName);
  }

   componentWillUnmount(){
    this.props.resetEditVocab()
   }

  handleSelectHighlight = (selectedText) => {
    let selectedVocabInfo = this.props.editVocab.MODKR.vocabSearch[selectedText]
    this.props.updateSelectedVocab(selectedVocabInfo);
  }

  render() {
    let vocabSearch = this.props.editVocab && this.props.editVocab.MODKR 
        && Object.keys(this.props.editVocab.MODKR.vocabSearch).length > 0 ? new RegExp(Object.keys(this.props.editVocab.MODKR.vocabSearch).join("|").replaceAll(")", "\\)").replaceAll("(", "\\(")) : null;

    let {editVocab} = this.props
    return (
      <div className="edit-Vocabulary">
        <Grid container>
          <Grid item xs={6}>{
            this.props.editVocab && this.props.editVocab.storyInfo && !this.props.editVocab.highlightTextUpdating  && this.props.editVocab.MODKR?
              <StoryTextContainer
                text={this.props.editVocab.MODKR.storyText}
                searchWord={vocabSearch}
                handleSelectHighlight={this.handleSelectHighlight}
                updateUserHighlightedText={this.props.updateUserHighlightedText}
                startUpdatingHighlightedText={this.props.startUpdatingHighlightedText}
                editVocab={this.props.editVocab}
              /> :
                <div style={{position: 'relative', padding: '17%'}}>
                    <h3 style={{position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%,-50%)'}}>Loading Story . . .</h3>
                    <LinearProgress style={{width: '50%', position: 'absolute', left: '50%', transform: 'translate(-50%,1500%)'}}/>
                </div>
          }
          </Grid>
          <Grid item xs={6}>
            {
              editVocab.selectedVocab && !this.props.editVocab.editVocabUpdating ?
                <EditVocabFormContainer
                  vocabList={this.props.editVocab.vocabList}
                  selectedVocab={editVocab.selectedVocab}
                  storyId={this.props.editVocab.storyInfo._id}
                  updateVocab={this.props.updateVocab}
                  deleteVocab={this.props.deleteVocab}
                  statusMessage={this.props.editVocab.editVocabStatusMessage}
                  editVocab={this.props.editVocab}
                /> : null
            }
            {
              this.props.editVocab.userHighlightedText && !this.props.editVocab.highlightTextUpdating ?
                <NewVocabFormContainer
                  editVocab={this.props.editVocab}
                  userHighlightedText={this.props.editVocab.userHighlightedText}
                  storyId={this.props.editVocab.storyInfo._id}
                  handleSelectHighlight={this.handleSelectHighlight}
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
  deleteVocab,
    resetEditVocab
})

export default connect(mapStateToProps, mapDispatchToProps)(EditVocab);
