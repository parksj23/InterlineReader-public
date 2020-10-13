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
        let urlSegments = this.props.history.location.pathname.split("/")
        let storyName = urlSegments[urlSegments.length-1]
        this.props.initEditGrammar(storyName);
    }


    handleSelectHighlight = (selectedText) => {
        if (selectedText !== "") {
            let selectedGrammarInfo = this.props.editGrammar.MODKR.grammarSearch[selectedText]
            this.props.updateSelectedGrammar(selectedGrammarInfo);
        }

    }

    render() {
        // let grammarSearch = this.props.editGrammar && this.props.editGrammar.MODKR && this.props.editGrammar.MODKR.grammarSearch ?
        //     new RegExp(Object.keys(this.props.editGrammar.MODKR.grammarSearch).join("|"), "g") : null;

        console.log(this.props.editGrammar)
        let grammarSearch = this.props.editGrammar && this.props.editGrammar.MODKR && this.props.editGrammar.MODKR.grammarSearch &&
        Object.keys(this.props.editGrammar.MODKR.grammarSearch).length > 0 ? new RegExp(Object.keys(this.props.editGrammar.MODKR.grammarSearch).join("|")) : null;
        let {editGrammar} = this.props
        return (
            <div className="edit-Vocabulary">
                <Grid container>
                    <Grid item xs={6}>{
                        this.props.editGrammar && this.props.editGrammar.storyInfo && !this.props.editGrammar.highlightTextUpdating  && this.props.editGrammar.MODKR ?
                            <StoryTextContainer
                                text={this.props.editGrammar.MODKR.storyText}
                                searchWord={grammarSearch}
                                handleSelectHighlight={this.handleSelectHighlight}
                                updateUserHighlightedText={this.props.updateUserHighlightedText}
                                startUpdatingHighlightedText={this.props.startUpdatingHighlightedText}
                                editGrammar={this.props.editGrammar}
                            /> : <div style={{color: "red", fontSize: '26pt'}}> Loading . . . </div>
                    }
                    </Grid>
                    <Grid item xs={6}>
                        {
                            editGrammar.selectedGrammar && !this.props.editGrammar.editGrammarUpdating ?
                                <EditGrammarFormContainer
                                    grammarList={this.props.editGrammar.grammarList}
                                    selectedGrammar={editGrammar.selectedGrammar}
                                    storyId={this.props.editGrammar.storyInfo._id}
                                    updateGrammar={this.props.updateGrammar}
                                    deleteGrammar={this.props.deleteGrammar}
                                    statusMessage={this.props.editGrammar.ediGrammarStatusMessage}
                                    editGrammar={this.props.editGrammar}
                                /> : null
                        }
                        {
                            this.props.editGrammar.userHighlightedText && !this.props.editGrammar.highlightTextUpdating ?
                                <NewGrammarFormContainer
                                    editGrammar={this.props.editGrammar}
                                    userHighlightedText={this.props.editGrammar.userHighlightedText}
                                    storyId={this.props.editGrammar.storyInfo._id}
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
    editGrammar: state.instructor.editGrammar,
    stories: state.stories
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

