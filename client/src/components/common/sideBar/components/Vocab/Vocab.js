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
    highlightedPos.scrollIntoView({ block: 'start',  behavior: 'smooth' })
  },1000)
}

const Vocab = (props) =>{
  const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"};
  const{vocab, classes} = props;
  return(
    <Table className={'table'} classes={{root: classes.root}}>
      <TableHead>
        <TableRow>
            <TableCell style={{maxWidth: "116px", paddingRight: "25px"}}> 한국어 </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> stem </TableCell>
          <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> 영어 </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> 한자 </TableCell>
          <TableCell> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vocab ?
          vocab.map((aVocab, index) => {
              const temp = aVocab.english.split(":");
            return (
              <TableRow key={'vocab' + index}>
                <TableCell style={{whiteSpace: "nowrap", cursor: 'pointer', maxWidth: "116px", paddingRight: "25px"}} onClick={() => {props.updateHighlightWord(aVocab.korean, "vocab"); scrollToPos()}}>{aVocab.korean}</TableCell>
                  <TableCell>{temp.length > 1? temp[0].trim() : '-'}</TableCell>
                  <TableCell style={pointerButton}>{temp.length > 1? temp[1].trim() : aVocab.english}</TableCell>
                  <TableCell style={pointerButton}>{aVocab.hanja}</TableCell>
                <TableCell onClick={ ()=> props.handleAddSavedWord(aVocab)}><Tooltip disableFocusListener title="Save Vocab"><i style={pointerButton} className="material-icons">add</i></Tooltip></TableCell>
            </TableRow>)
          }) : <TableRow/>}
      </TableBody>
    </Table>
  )

}

export default withStyles(styles)(Vocab);