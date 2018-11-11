import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Vocab from './Vocab/VocabContainer';
import Grammar from './Grammar/GrammarContainer';
import SavedWords from './SavedWords/SavedWordsContainer';
import GrammarSearch from './GrammarSearch/GrammarSearch';
import Dictionary from './Dictionary/Dictionary';
import Button from "@material-ui/core/Button";
import Resizable from 're-resizable';
import StatusMessage from '../../statusMessage/statusMessage';




const styles ={
  menuButton: {
    color: "#FFFFFF"
  },
  appBarRoot: {
    overflow: 'hidden'
  },
  tabsRoot: {
    backgroundColor: "#212529",
    overflow:'scroll'
  }


}

const SideBar = (props) => {

  const{story, vocab, grammar, left, classes, tab} = props;
  return (
    <div className={story}>
      <Tooltip disableFocusListener title="Open Drawer">
        <Button classes={{root: classes.menuButton}} onClick={props.toggleDrawer('left', true)}>
          <i className="material-icons" style={{zoom: "1.5"}}>menu</i>
        </Button></Tooltip>
      <Drawer id={"DrawerContainer"} variant="persistent" open={left} onClose={props.toggleDrawer('left', false)}>
        <Resizable
          defaultSize={{
            width: "40vw",
            height: "100vh",
          }}
          id={'resizeContainer'}
          onResize={props.onResize}
        >
          <div tabIndex={0} role="button">
            <div>
              <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}/>
                <Grid item xs={2}>
                  <div className={'close-button-container'}>
                    <i style={{fontSize: "36px"}} className="material-icons" onClick={props.toggleDrawer('left', false)}>close</i></div>
                </Grid>
              </Grid>
            </div>
            <AppBar position="static" classes={{root: classes.appBarRoot}}>
              <Tabs classes={{root: classes.tabsRoot}} tab={props.tab} onChange={props.handleTabChange} scrollable
                    scrollButtons='auto'>
                <Tab label="어휘"/>
                <Tab label="문법"/>
                <Tab label="저장한 단어" href="#basic-tabs"/>
                <Tab label="문법검색"/>
                <Tab label="사전"/>
              </Tabs>
            </AppBar>
            {tab === 0 && <div><Vocab vocab={vocab} addWord={props.handleAddVocab}/></div>}
            {tab === 1 && <div><Grammar grammar={grammar}/></div>}
            {tab === 2 && <div><SavedWords story={props.story}/></div>}
            {tab === 3 && <div><GrammarSearch/></div>}
            {tab === 4 && <div><Dictionary/></div>}
          </div>
        </Resizable>
      </Drawer>
      <StatusMessage status="success" open={props.openStatus} message={props.statusMessage} handleClose={props.handleStatusClose}/>
    </div>
  )


}

export default withStyles(styles)(SideBar);