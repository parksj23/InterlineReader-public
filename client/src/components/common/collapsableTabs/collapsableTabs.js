import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import {getSavedWords, handleStatusClose, toggleSideBar} from "../../../actions/sideBar";
import {updateDrawerSize} from "../../../actions/dashboard";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './styles/collapsableTabs.css';

class CollapsableTabs extends Component {


  render() {

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
            <ExpansionPanel classes={{root: 'menu-tab'}}>
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
}

const mapStateToProps = state => ({
  stories: state.stories
})

const mapDispatchToProps = ({
})


export default connect(mapStateToProps, mapDispatchToProps) (CollapsableTabs);