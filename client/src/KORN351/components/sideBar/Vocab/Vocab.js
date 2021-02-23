import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from "react-redux";
import {getNewVocabulary} from "../../../../actions/KORN351/Lessons";
import {withRouter} from "react-router-dom";

const styles ={
    root: {
        maxWidth: "100%"
    }
};

const Vocab = (props) =>{
    const{newVocab, classes, getNewVocabulary} = props;
    if (newVocab === '') getNewVocabulary(props.match.params.lesson);

    console.log(newVocab);
    return(
        <div>
            <br/>
            <b style={{paddingLeft: '2%', fontSize: '20px'}}>New Vocabulary from Main Text</b>
            <br/><br/>
            <Table className={'table'} classes={{root: classes.root}}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: "50%", textAlign: 'center'}}> Korean </TableCell>
                        <TableCell style={{width: "50%", textAlign: 'center'}}> English </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newVocab !== '' ?
                        newVocab.mainText.map((aVocab, index) => {
                            return (
                                <TableRow key={'mainTextVocab' + index}>
                                    <TableCell style={{width: "50%", textAlign: 'center'}}>{aVocab.kor}</TableCell>
                                    <TableCell style={{width: "50%", textAlign: 'center'}}>{aVocab.eng}</TableCell>
                                </TableRow>)
                        }) : <TableRow/>}
                </TableBody>
            </Table>
            <br/><br/>
            <b style={{paddingLeft: '2%', fontSize: '20px'}}>New Vocabulary from Example Sentences</b>
            <br/><br/>
            <Table className={'table'} classes={{root: classes.root}}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: "50%", textAlign: 'center'}}> Korean </TableCell>
                        <TableCell style={{width: "50%", textAlign: 'center'}}> English </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newVocab !== '' ?
                        newVocab.exSentences.map((aVocab, index) => {
                            return (
                                <TableRow key={'exSentencesVocab' + index}>
                                    <TableCell style={{width: "50%", textAlign: 'center'}}>{aVocab.kor}</TableCell>
                                    <TableCell style={{width: "50%", textAlign: 'center'}}>{aVocab.eng}</TableCell>
                                </TableRow>)
                        }) : <TableRow/>}
                </TableBody>
            </Table>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        newVocab : state.lessons.newVocabulary
    };
};

export default withRouter(connect(mapStateToProps,{getNewVocabulary})(withStyles(styles)(Vocab)));
