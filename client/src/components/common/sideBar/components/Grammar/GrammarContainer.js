import React, {Component} from "react";
import Grammar from "./Grammar";
import {updateHighlightedWord} from '../../../../../actions/KORN410/vocab';
import {connect} from "react-redux";
import {addSavedGrammar} from '../../../../../actions/KORN410/sideBar';

class GrammarContainer extends Component {
    constructor(props) {
        super(props);
        this.updateHighlightWord.bind(this);
    }

    componentWillUnmount(){
    }

    handleAddSavedGrammar =(grammar) => {
        if(this.props.sideBar.savedGrammarIds.indexOf(grammar._id) === -1){
            this.props.addSavedGrammar(this.props.userId, this.props.stories.storyInfo._id, this.props.sideBar.savedGrammarIds, grammar, true);
            this.props.addGrammar('success');
        }
    }

    updateHighlightWord = (vocabWord, type) =>{
        this.props.updateHighlightedWord(vocabWord, type)

    }

    render(){
        const grammarList = this.props.grammar;
        return(
            <div>
                <Grammar grammarList={grammarList} updateHighlightWord={this.updateHighlightWord} handleAddSavedGrammar={this.handleAddSavedGrammar}/>
            </div>
        )
    }



}
const mapStateToProps = state => (
    {
        stories: state.stories,
        userId: state.auth.user.id,
        sideBar: state.sideBar
    }
)

const mapDispatchToProps = ({addSavedGrammar, updateHighlightedWord})

export default connect(mapStateToProps, mapDispatchToProps)(GrammarContainer);