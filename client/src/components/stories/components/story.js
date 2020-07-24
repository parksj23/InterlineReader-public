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
  const {text, searchWord, classes, title, author, language, handleTranslate, handleFlashCards, handleOriginalText} = props;
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
        {
          props.stories.MODKR && props.stories.MODKR.storyText ?
          <Tooltip title="Modern Korean" aria-label="Flashcard" placement="left">
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=> handleTranslate("MODKR")}>
              Kor
            </Fab>
          </Tooltip> : null
        }
        {
          props.stories.ENGSH && props.stories.ENGSH.storyText ?
            <Tooltip title="English" placement="left">
              <Fab color="primary" className={classes.fab}  onClick={()=> handleTranslate("ENGSH")}>
                Eng
              </Fab>
            </Tooltip> : null
        }
        {
          props.stories.MIDKR && props.stories.MIDKR.storyText ?
            <Tooltip title="Middle Korean" placement="left">
              <Fab color="primary" className={classes.fab} onClick={()=> handleTranslate("MIDKR")}>
                Mid
              </Fab>
            </Tooltip> : null
        }
        {
          props.stories.HANMN && props.stories.HANMN.storyText ?
            <Tooltip title="Hanmun" placement="left" onClick={()=> handleTranslate("HANMN")}>
              <Fab color="primary" className={classes.fab}>
                Han
              </Fab>
            </Tooltip> : null
        }
        {
          props.stories.MODKR && props.stories.MODKR.storyText ?
            <Tooltip title="Flashcard" placement="left" onClick={handleFlashCards}>
              <Fab color="primary" className={classes.fab}>
                FC
              </Fab>
            </Tooltip> : null
        }
        {
          props.stories.storyInfo.pdfUrl ?
          <Tooltip title="Original Text" placement="left" onClick={handleOriginalText}>
            <Fab color="primary" className={classes.fab}>
              OT
            </Fab>
          </Tooltip> : null
        }
      </div>
    </div>
  )

}

export default withStyles(styles)(Story);