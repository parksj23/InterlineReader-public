import React, {Component} from "react";
import {connect} from "react-redux";
import {getSavedWords, deleteSavedWord, updateSavedWords, deleteSavedGrammar} from "../../../../../actions/sideBar";
import SavedGrammars from './SavedGrammars';
import {updateHighlightedWord} from "../../../../../actions/vocab";

class SavedGrammarsContainer extends Component {

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.sideBar.savedGrammarIds){
            return this.props.sideBar.savedGrammarIds === nextProps.sideBar.savedGrammarIds
        }
        return false
    }

    handleDelete = (grammar) => {
        if(this.props.sideBar.savedGrammarIds.indexOf(grammar._id) > -1){
            let savedGrammarIds = this.props.sideBar.savedGrammarIds;
            let index = savedGrammarIds.indexOf(grammar._id);
            if(index > -1) {
                savedGrammarIds.splice(index,1);
            }
            this.props.deleteSavedGrammar(this.props.userId, this.props.stories.storyInfo._id, savedGrammarIds);
        }
    }

    updateHighlightWord = (vocabWord, type) =>{
        this.props.updateHighlightedWord(vocabWord, type)
    }

    render(){
        const savedGrammarIds = this.props.sideBar.savedGrammarIds;
        return(
            <div>
                <SavedGrammars updateHighlightWord={this.updateHighlightWord} grammar={this.props.grammar} savedGrammarIds={savedGrammarIds} handleDelete={this.handleDelete}/>
            </div>
        )
    }
}


const mapStateToProps = state => (
    {
        userId: state.auth.user.id,
        stories: state.stories,
        sideBar: state.sideBar
    }
)

const mapDispatchToProps = ({
    getSavedWords,
    deleteSavedWord,
    updateSavedWords,
    updateHighlightedWord,
    deleteSavedGrammar
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedGrammarsContainer);