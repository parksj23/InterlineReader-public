import React, {Component} from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../actions/vocab';

class Grammar extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
    this.updateHighlightWord.bind(this);
  }

  updateHighlightWord = (vocabWord, type) =>{
    this.props.updateHighlightedWord(vocabWord, type)

  }

  renderVocab = (grammar) => {
    const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"};
    return(
      <TableRow>
        <TableCell style={{cursor: 'pointer'}} onClick={() => this.updateHighlightWord(grammar.sentence, "grammar")}>{grammar.sentence}</TableCell>
        <TableCell style={{cursor: 'pointer'}}>{grammar.pattern}</TableCell>
        <TableCell style={{cursor: 'pointer'}}>{grammar.here}</TableCell>
      </TableRow>
    )
  }

  render(){
    const grammarList = this.props.grammar;
    return(
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sentence</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>Context</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grammarList.map((grammar) => {return this.renderVocab(grammar)})}
          </TableBody>
        </Table>
      </div>

    )

  }



}
const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id
  }
)

const mapDispatchToProps = ({updateHighlightedWord})

export default connect(mapStateToProps, mapDispatchToProps)(Grammar);