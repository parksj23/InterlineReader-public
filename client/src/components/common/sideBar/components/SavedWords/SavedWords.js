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

const SavedWords = (props) => {
  const {savedWords, classes} = props;
  return(
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>한국어</TableCell>
            <TableCell>stem</TableCell>
          <TableCell>영어</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {savedWords ? savedWords.map((aVocab, vocabIndex) => {
            const temp = aVocab.english.split(":");
            return (
          <TableRow key={'savedWord_'+vocabIndex}>
            <TableCell style={{whiteSpace: "nowrap"}}>{aVocab.korean}</TableCell>
              <TableCell>{temp.length > 1? temp[0].trim() : '-'}</TableCell>
            <TableCell>{temp.length > 1? temp[1].trim() : aVocab.english}</TableCell>
            <TableCell onClick={()=> props.handleDelete(aVocab)}><Tooltip disableFocusListener title="Delete Word" style={{cursor: 'pointer'}}><i className="material-icons" classes={{root: classes.icons}}>delete</i></Tooltip></TableCell>
          </TableRow>
        )}) : <TableRow/>}
      </TableBody>
    </Table>
  )
}

export default withStyles(styles)(SavedWords);