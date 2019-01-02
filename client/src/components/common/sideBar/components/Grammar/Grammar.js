import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  tableCell: {
    cursor: "pointer"
  }
}

// scrolling by word click
const scrollToPos = () => {
  setTimeout(() =>{
    let highlightedPos = document.getElementsByClassName("highlight")[0]
    highlightedPos.scrollIntoView({ block: 'start',  behavior: 'smooth' })
  },1000)
}

const Grammar = (props) => {
  const {grammarList, classes} = props
  const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"}

  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Sentence</TableCell>
          <TableCell>Pattern</TableCell>
          <TableCell>Context</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {grammarList.map((grammar, index) => {
          return (
            <TableRow key={"grammar_" + index}>
              <TableCell classes={{root: classes.cursor}}
                         style={{cursor: 'pointer', maxWidth: "116px", paddingRight: "25px"}}
                         onClick={() =>{props.updateHighlightWord(grammar.sentence, "grammar"); scrollToPos()} }>{grammar.sentence}</TableCell>
              <TableCell style={pointerButton} classes={{root: classes.cursor}}>{grammar.pattern}</TableCell>
              <TableCell style={pointerButton} classes={{root: classes.cursor}}>{grammar.here}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

}

export default withStyles(styles)(Grammar);