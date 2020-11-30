import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';


const styles= {
  icons: {
    cursor: 'pointer',
    maxWidth: "116px",
    paddingLeft: "8px"
  }
}
const scrollToPos = () => {
    setTimeout(() =>{
        let highlightedPos = document.getElementsByClassName("highlight")[0]
        if (highlightedPos !== undefined)
            highlightedPos.scrollIntoView({ block: 'start',  behavior: 'smooth' })
    },1000)
}

const SavedWords = (props) => {
  const {savedWords, classes} = props;
  return(
    <Table>
      <TableHead>
        <TableRow>
            <TableCell style={{maxWidth: "116px", paddingRight: "25px"}}> 한국어 </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> stem </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> 영어 </TableCell>
            <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> 한자 </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {savedWords ? savedWords.map((aVocab, vocabIndex) => {
            return (
          <TableRow key={'savedWord_'+vocabIndex}>
            <TableCell style={{whiteSpace: "nowrap", cursor: 'pointer', paddingRight: "25px"}} onClick={() => {props.updateHighlightWord(aVocab.korean.trim(), "vocab"); scrollToPos()}}>{aVocab.korean}</TableCell>
              <TableCell>{aVocab.stem}</TableCell>
              <TableCell>{aVocab.english}</TableCell>
              <TableCell>{aVocab.hanja}</TableCell>
            <TableCell onClick={()=> props.handleDelete(aVocab)}><Tooltip disableFocusListener title="Delete Word" style={{cursor: 'pointer'}}><i className="material-icons" classes={{root: classes.icons}}>delete</i></Tooltip></TableCell>
          </TableRow>
        )}) : <TableRow/>}
      </TableBody>
    </Table>
  )
}

export default withStyles(styles)(SavedWords);