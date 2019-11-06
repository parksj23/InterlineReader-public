import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  initEditGrammar, updateSelectedGrammar, startUpdatingHighlightedText, updateUserHighlightedText, updateGrammar, deleteGrammar
} from "../../../actions/instructor";
import "./EditGrammar.css"
import StoryTextContainer from './StoryTextContainer/StoryTextContainer';
import EditGrammarFormContainer from './EditGrammarFormContainer/EditGrammarFormContainer';
import NewGrammarFormContainer from './EditGrammarFormContainer/NewGrammarFormContainer';

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
  handleSelectHighlight = (selectedText) => {
    let selectedGrammarInfo = this.props.editGrammar.grammarSearch[selectedText]
    this.props.updateSelectedGrammar(selectedGrammarInfo);
  }

  render() {
    let grammarSearch = this.props.editGrammar && this.props.editGrammar.grammarSearch ? new RegExp(Object.keys(this.props.editGrammar.grammarSearch).join("|"), "g") : null;
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
           {
              editGrammar.selectedGrammar && !this.props.editGrammar.editGrammarUpdating ?
                <EditGrammarFormContainer
                  grammarList={this.props.editGrammar.grammarList}
                  selectedGrammar={editGrammar.selectedGrammar}
                  storyTitle={this.props.editGrammar.storyTitle}
                  updateGrammar={this.props.updateGrammar}
                  deleteGrammar={this.props.deleteGrammar}

                /> : null
            }
            {
              this.props.editGrammar.userHighlightedText && !this.props.editGrammar.highlightTextUpdating ?
                <NewGrammarFormContainer
                  editGrammar={this.props.editGrammar}
                  userHighlightedText={this.props.editGrammar.userHighlightedText}
                  storyTitle={this.props.editGrammar.storyTitle}
                /> : null
            }
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
  initEditGrammar,
  updateSelectedGrammar,
  startUpdatingHighlightedText,
  updateUserHighlightedText,
  updateGrammar,
  deleteGrammar
})

export default connect(mapStateToProps, mapDispatchToProps)(EditGrammar);

