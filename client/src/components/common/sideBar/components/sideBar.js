import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Vocab from './Vocab/VocabContainer';
import Grammar from './Grammar/GrammarContainer';
import SavedWords from './SavedWords/SavedWordsContainer';
import GrammarSearch from './GrammarSearch/GrammarSearch';
import Dictionary from './Dictionary/Dictionary';
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
    backgroundColor: "#343a40",
    overflow:'scroll'
  },
  flexContainer: {
    flexWrap: 'wrap'
  },
  indicator: {
    backgroundColor: '#343a40'
  },

}

const SideBar = (props) => {

  const{story, vocab, grammar, left, classes} = props;
  return (
    <div className={story}>
      <Drawer id={"DrawerContainer"} variant="persistent" open={left} onClose={()=>props.toggleDrawer('left', false)}>
        <Resizable
          defaultSize={{
            width: "40vw",
            height: "100vh",
          }}
          id={'resizeContainer'}
          onResize={props.onResize}
        >
          <div tabIndex={0} role="button">
            {/* <div>
              <Grid container>
                <Grid item xs={2}>
                  <div className={'close-button-container'}>
                    <i style={{fontSize: "36px"}} className="material-icons" onClick={()=>props.toggleDrawer('left', false)}>close</i></div>
                </Grid>
              </Grid>
            </div> */}
            <AppBar id="appbar" position="static" classes={{root: classes.appBarRoot}}>
              <Tabs className="sideBar-tabs" classes={{root: classes.tabsRoot, flexContainer: classes.flexContainer, indicator: classes.indicator}} value={props.tab} onChange={props.handleTabChange} 
                    scrollButtons='auto'>
                <Tab label="어휘"/>
                <Tab label="문법"/>
                <Tab label="저장한 단어"/>
                <Tab label="문법검색"/>
                <Tab label="사전"/>
                <i style={{cursor:"pointer", fontSize: "28px", position:"absolute", "bottom":"0", "right": "0"}} className="material-icons" onClick={()=>props.toggleDrawer('left', false)}>arrow_back_ios</i>
              </Tabs>
            </AppBar>
            {props.tab === 0 && <div><Vocab vocab={vocab} addWord={props.handleAddVocab}/></div>}
            {props.tab === 1 && <div><Grammar grammar={grammar}/></div>}
            {props.tab === 2 && <div><SavedWords story={props.story}/></div>}
            {props.tab === 3 && <div><GrammarSearch story={props.story}/></div>}
            <div style={{display: props.tab === 4 ? 'block' : 'none'}}><Dictionary/></div>
          </div>
        </Resizable>
      </Drawer>
      <StatusMessage status="success" open={props.openStatus} message={props.statusMessage} handleClose={props.handleStatusClose}/>
    </div>
  )


}

export default withStyles(styles)(SideBar);