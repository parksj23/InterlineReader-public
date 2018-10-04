import React, {Component} from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Grammar extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
  }

  renderVocab = (grammar) => {
    return(
      <TableRow>
        <TableCell>{grammar.sentence}</TableCell>
        <TableCell>{grammar.pattern}</TableCell>
        <TableCell>{grammar.here}</TableCell>
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

export default(Grammar);