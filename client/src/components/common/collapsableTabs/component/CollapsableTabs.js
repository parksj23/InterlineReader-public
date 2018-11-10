import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";

const styles = {

}


const CollapsableTabs = (props) => {

    return (
      <div className={'collapsableTabContainer'}>

        <List disablePadding>
          <ListItem button disableGutters divider classes={{root: 'list-item'}} style={{paddingBottom: "0px"}}>
            <ExpansionPanel classes={{root: 'menu-tab', expanded: "menu-expanded"}}>
              <ExpansionPanelSummary>
                Stories
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  <ListItem>
                    <ListItemText primary={'Sonagi'}/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={'Almaden'}/>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem button disableGutters divider classes={{root: 'list-item', button:'list-item'}}>
            <ExpansionPanel classes={{root: 'menu-tab'}} onChange={()=> props.handleChangeTab("addStory")}>
              <ExpansionPanelSummary>
                Add
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  <ListItem >
                    <ListItemText primary={'Story'}/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={'User'}/>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
        </List>
      </div>
    )
}



export default withStyles(styles)(CollapsableTabs);