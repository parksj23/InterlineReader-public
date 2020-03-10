import React from 'react'
import Paper from '@material-ui/core/Paper';
import StoryText from './common/storyText';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  fab: {
    marginTop: '4px',
    marginBottom: '4px',
    width: '48px',
    height: '48px'
  }
}

const Story = (props) => {
  const {text, searchWord, classes, title, author, language, handleTranslate, handleFlashCards} = props;
  return(
    <div>
      <Paper elevation={1} style={props.sideBar && props.sideBar.isSideBarOpen ? {marginLeft: props.sideBar.drawerSize.width+ "px"} : null}>
        {text ?
          <StoryText title={title}
                     author={author}
                     text={text}
                     searchWord={searchWord || "!@F$@%F"}
                     language={language}
                     />
          : null}
      </Paper>
      <div className='translateContainer' >
        <Tooltip title="Modern Korean" aria-label="Flashcard" placement="left">
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=> handleTranslate("MODKR")}>
            Kor
          </Fab>
        </Tooltip>
        <Tooltip title="English" placement="left">
          <Fab color="primary" className={classes.fab}  onClick={()=> handleTranslate("ENGSH")}>
            Eng
          </Fab>
        </Tooltip>
        <Tooltip title="Middle Korean" placement="left">
          <Fab color="primary" className={classes.fab} onClick={()=> handleTranslate("MIDKR")}>
            Mid
          </Fab>
        </Tooltip>
        <Tooltip title="Hanmun" placement="left" onClick={()=> handleTranslate("hanmun")}>
          <Fab color="primary" className={classes.fab}>
            Han
          </Fab>
        </Tooltip>
        <Tooltip title="Flashcard" placement="left" onClick={handleFlashCards}>
          <Fab color="primary" className={classes.fab}>
            FC
          </Fab>
        </Tooltip>
      </div>
    </div>
  )

}

export default withStyles(styles)(Story);