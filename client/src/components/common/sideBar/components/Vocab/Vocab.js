import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';


const styles ={
  root: {
    maxWidth: "100%"
  }
}

const scrollToPos = () => {
  setTimeout(() =>{
    let highlightedPos = document.getElementsByClassName("highlight")[0]
    if (highlightedPos !== undefined)
        highlightedPos.scrollIntoView({ block: 'start',  behavior: 'smooth' })
  },1000)
}

const Vocab = (props) =>{
  const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"};
  const{vocab, classes} = props;
  console.log(vocab)
  return(
    <Table className={'table'} classes={{root: classes.root}}>
      <TableHead>
        <TableRow>
            <TableCell style={{maxWidth: "116px", paddingRight: "25px"}}> Korean </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> Dictionary Form </TableCell>
          <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> English </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> Hanja </TableCell>
          <TableCell> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vocab ?
          vocab.map((aVocab, index) => {
            return (
              <TableRow key={'vocab' + index}>
                <TableCell style={{whiteSpace: "nowrap", cursor: 'pointer', maxWidth: "116px", paddingRight: "25px"}} onClick={() => {props.updateHighlightWord(aVocab.korean.trim(), "vocab"); scrollToPos()}}>{aVocab.korean}</TableCell>
                  <TableCell>{aVocab.stem}</TableCell>
                  <TableCell style={pointerButton}>{aVocab.english}</TableCell>
                  <TableCell style={pointerButton}>{aVocab.hanja}</TableCell>
                <TableCell onClick={ ()=> props.handleAddSavedWord(aVocab)}><Tooltip disableFocusListener title="Save Vocab"><i style={pointerButton} className="material-icons">add</i></Tooltip></TableCell>
            </TableRow>)
          }) : <TableRow/>}
      </TableBody>
    </Table>
  )

}

export default withStyles(styles)(Vocab);