import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  tableCell: {
    cursor: "pointer"
  }
}

// scrolling by word click
const scrollToPos = () => {
  setTimeout(() =>{
    let highlightedPos = document.getElementsByClassName("highlight")[0]
      if (highlightedPos !== undefined)
        highlightedPos.scrollIntoView({ block: 'start',  behavior: 'smooth' })
  },1000)
};

const Grammar = (props) => {
  const {grammarList, classes} = props
  const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"}
  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Korean</TableCell>
          <TableCell>Pattern</TableCell>
            <TableCell>Gloss</TableCell>
          <TableCell>Here</TableCell>
            <TableCell> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {grammarList.map((grammar, index) => {
          return (
            <TableRow key={"grammar_" + index}>
              <TableCell classes={{root: classes.cursor}}
                         style={{cursor: 'pointer', width: "116px", paddingRight: "25px"}}
                         onClick={() =>{props.updateHighlightWord(grammar.korean.trim(), "grammar"); scrollToPos()} }>{grammar.korean}</TableCell>
                <TableCell><div dangerouslySetInnerHTML={{ __html: grammar.pattern }} /></TableCell>
                <TableCell><div dangerouslySetInnerHTML={{ __html: grammar.gloss }} /></TableCell>
              <TableCell>{grammar.here}</TableCell>
                <TableCell onClick={ ()=> props.handleAddSavedGrammar(grammar)}><Tooltip disableFocusListener title="Save Grammar"><i style={pointerButton} className="material-icons">add</i></Tooltip></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

}

export default withStyles(styles)(Grammar);