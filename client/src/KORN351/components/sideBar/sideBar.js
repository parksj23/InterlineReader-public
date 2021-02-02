import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Vocab from './Vocab/Vocab';
import Dictionary from './Dictionary/Dictionary';
import Resizable from 're-resizable';

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
};

const SideBar = (props) => {

  const{left, classes} = props;

  return (
    <div>
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
            <AppBar id="appbar" position="static" classes={{root: classes.appBarRoot}}>
              <Tabs className="sideBar-tabs" classes={{root: classes.tabsRoot, flexContainer: classes.flexContainer, indicator: classes.indicator}} value={props.tab} onChange={props.handleTabChange} 
                    scrollButtons='auto' style={{overflow: 'hidden'}}>
                <Tab label="어휘"/>
                <Tab label="사전"/>
                <i style={{cursor:"pointer", fontSize: "28px", position:"absolute", "bottom":"0", "right": "0"}} className="material-icons" onClick={()=>props.toggleDrawer('left', false)}>arrow_back_ios</i>
              </Tabs>
            </AppBar>
            {props.tab === 0 && <div><Vocab /></div>}
            <div style={{display: props.tab === 1 ? 'block' : 'none'}}><Dictionary/></div>
          </div>
        </Resizable>
      </Drawer>
    </div>
  )
};

export default withStyles(styles)(SideBar);
