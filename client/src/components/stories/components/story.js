import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper';
import StoryText from './common/storyText';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import Popover from '@material-ui/core/Popover';

const styles = {
    fab: {
        marginTop: '4px',
        marginBottom: '4px',
        width: '48px',
        height: '48px'
    },
    typography: {
        width: '100%',
        padding: ' 10%',
        backgroundColor: '#004280',
        color: 'white'
    }
}

const Story = (props) => {
    const {text, searchWord, classes, title, author, language, handleTranslate, handleFlashCards, handleOriginalText} = props;
    const [toggleVocab, setToggleVocab] = useState(false);
    const [toggleGrammar, setToggleGrammar] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = () => {
        setAnchorEl(true);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <div>
            <Paper elevation={1} style={props.sideBar && props.sideBar.isSideBarOpen ? {marginLeft: props.sideBar.drawerSize.width+ "px"} : null}>
                {text ?
                    <StoryText title={title}
                               author={author}
                               text={text}
                               searchWord={searchWord || "!@F$@%F"}
                               language={language}
                               toggleVocab={toggleVocab}
                               toggleGrammar={toggleGrammar}
                               grammarList={props.stories.MODKR.grammarList}
                               vocabList={props.stories.MODKR.vocabList}
                    />
                    : null}
            </Paper>
            <div className='translateContainer' >
                {
                    props.stories.MODKR && props.stories.MODKR.storyText && language === "ENGSH"?
                        <Tooltip title="Modern Korean" aria-label="Flashcard" placement="left" style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=> handleTranslate("MODKR")}>
                                Kor
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.ENGSH && props.stories.ENGSH.storyText && language === "MODKR"?
                        <Tooltip title="English" placement="left" style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" className={classes.fab}  onClick={()=> handleTranslate("ENGSH")}>
                                Eng
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.MIDKR && props.stories.MIDKR.storyText ?
                        <Tooltip title="Middle Korean" placement="left" style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" className={classes.fab} onClick={()=> handleTranslate("MIDKR")}>
                                Mid
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.HANMN && props.stories.HANMN.storyText ?
                        <Tooltip title="Hanmun" placement="left" onClick={()=> handleTranslate("HANMN")} style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" className={classes.fab}>
                                Han
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.MODKR && props.stories.MODKR.storyText ?
                        <Tooltip title="Flashcards" placement="left" onClick={() => handleFlashCards(false)} style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" className={classes.fab}>
                                FC
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.MODKR && props.stories.MODKR.storyText ?
                        <Tooltip title="Saved Flashcards" placement="left" onClick={() => handleFlashCards(true)} style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" className={classes.fab}>
                                &#9733;FC
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.storyInfo.pdfUrl ?
                        <Tooltip title="Original Text" placement="left" onClick={handleOriginalText} style={{backgroundColor: '#00284d'}}>
                            <Fab color="primary" className={classes.fab}>
                                OT
                            </Fab>
                        </Tooltip> : null
                }
                {
                    props.stories.MODKR && props.stories.MODKR.storyText && language === "MODKR"?
                        <span>
                            <Tooltip title="Modern Korean" aria-label="Flashcard" placement="left" style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=> handleTranslate("MODKR")}>
                                    <FormatPaintIcon onClick={handleClick}/>
                                </Fab>
                            </Tooltip>
                            <Popover
                                id={id}
                                open={anchorEl}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <div>
                                    <button className={classes.typography} onClick={() => {setToggleGrammar(false); setToggleVocab(!toggleVocab);}}>Vocab</button>
                                    <button className={classes.typography} onClick={() => {setToggleVocab(false); setToggleGrammar(!toggleGrammar)}}>Grammar</button>
                                </div>
                            </Popover>
                        </span>: null
                }
            </div>
        </div>
    )

}

export default withStyles(styles)(Story);