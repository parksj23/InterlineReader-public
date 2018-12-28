import React from 'react'
import Paper from '@material-ui/core/Paper';
import StoryText from './common/storyText';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';



const styles ={
  button: {
    containedPrimary: "translateButton",
    position: "fixed",
    right: "2vw",
    bottom: "2vh",
    zIndex: "100",
    backgroundColor: "#42b35b"
  }
}

const Story = (props) => {
  const {text, searchWord, classes, title, author} = props;
  return(
    <div>
      <Paper elevation={1} style={props.sideBar && props.sideBar.isSideBarOpen ? {marginLeft: props.sideBar.drawerSize.width+ "px"} : null}>
        {text ?
          <StoryText title={title} author={author} text={text} searchWord={searchWord || "!@F$@%F"}/>
          : null}
          {console.log(text)}
      </Paper>
      <div className='translateContainer'>
        <Button variant="contained" className={"translateButton"} classes={{root: classes.button}} color="primary" aria-label="Translate" onClick={props.handleTranslate}>Translate</Button>
      </div>
    </div>
  )

}

export default withStyles(styles)(Story);