import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  initEditGrammar,
} from "../../../actions/instructor";

import StoryTextContainer from './StoryTextContainer/StoryTextContainer';

import Grid from '@material-ui/core/Grid';

class EditGrammar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storyName: null,
      userHighlightedText: null
    }
  }

  componentWillMount() {
    let {storyName} = this.props.match.params
    this.props.initEditGrammar(storyName);
  }

  componentWillUnmount(){
  }

  /*  handleSelectHighlight = (selectedText) => {
    let selectedVocabInfo = this.props.editVocab.vocabSearch[selectedText]
    this.props.updateSelectedVocab(selectedVocabInfo);
  }*/

  /*handleUserHighlightText = () => {
    let text = null;
    if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
      this.props.updateUserHighlightedText(text);
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
      this.props.updateUserHighlightedText(text);
    }
  }*/

  render() {
    let grammarSearch = this.props.editGrammar && this.props.editGrammar.grammarSearch ? new RegExp(Object.keys(this.props.editGrammar.grammarSearch).join("|"), "g") : null;

    console.log(grammarSearch)
    let {editGrammar} = this.props
    return (
      <div className="edit-Vocabulary">
        <Grid container>
          <Grid item xs={6}>{
            this.props.editGrammar && this.props.editGrammar.storyInfo && !this.props.editGrammar.highlightTextUpdating  ?
              <StoryTextContainer
                text={this.props.editGrammar.storyTextKorn}
                searchWord={grammarSearch}
                handleSelectHighlight={this.handleSelectHighlight}
                updateUserHighlightedText={this.props.updateUserHighlightedText}
                startUpdatingHighlightedText={this.props.startUpdatingHighlightedText}
                editGrammar={this.props.editGrammar}
              /> : null
          }
          </Grid>
          <Grid item xs={6}>
           {/* {
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
            }*/}
          </Grid>
        </Grid>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  editGrammar: state.instructor.editGrammar
});

const mapDispatchToProps = ({
  initEditGrammar
})

export default connect(mapStateToProps, mapDispatchToProps)(EditGrammar);



