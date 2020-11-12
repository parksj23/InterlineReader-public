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

// scrolling by word click
const scrollToPos = () => {
    setTimeout(() =>{
        let highlightedPos = document.getElementsByClassName("highlight")[0]
        if (highlightedPos !== undefined)
            highlightedPos.scrollIntoView({ block: 'start',  behavior: 'smooth' })
    },1000)
}

const SavedGrammars = (props) => {
    const {savedGrammarIds, grammar, classes} = props;
    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{width: '25%'}}>Sentence</TableCell>
                    <TableCell style={{width: '30%'}}>Pattern</TableCell>
                    <TableCell>Context</TableCell>
                    <TableCell> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {grammar&&savedGrammarIds ? grammar.map((grammar, index) => {
                    if (savedGrammarIds.indexOf(grammar._id) > -1)
                        return (
                            <TableRow key={"grammar_" + index}>
                                <TableCell classes={{root: classes.cursor}}
                                           style={{cursor: 'pointer', paddingRight: "25px"}}
                                           onClick={() =>{props.updateHighlightWord(grammar.sentence.trim(), "grammar"); scrollToPos()} }>{grammar.sentence}</TableCell>
                                <TableCell>{grammar.pattern}</TableCell>
                                <TableCell>{grammar.here}</TableCell>
                                <TableCell onClick={()=> props.handleDelete(grammar)}><Tooltip disableFocusListener title="Delete Grammar" style={{cursor: 'pointer'}}><i className="material-icons" classes={{root: classes.icons}}>delete</i></Tooltip></TableCell>
                            </TableRow>
                        )}) : <TableRow/>}
            </TableBody>
        </Table>
    )
}

export default withStyles(styles)(SavedGrammars);