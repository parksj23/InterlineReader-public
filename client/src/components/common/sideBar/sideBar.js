import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import ReactHTMLParser from "react-html-parser";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Vocab from './Vocab';
import Grammar from './Grammar';
import SavedWords from './SavedWords';
import GrammarSearch from './GrammarSearch';
import Dictionary from './Dictionary'

class SideBar extends Component {

  constructor(props){
    super(props)

    this.state = {
      left: false,
      value: 0
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };


  render(){
    let {value} = this.state;
    return(
      <div>
        <Button style={{position: "absolute"}} onClick={this.toggleDrawer('left', true)}><i className="material-icons">menu</i></Button>
        <Drawer style={{maxWidth: "33vw"}} open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            style={{maxWidth: "40vw"}}
            >
            <div>
              <div>
                <Grid container>
                  <Grid item xs={2}><div style={{float: "left", marginLeft: "15px", marginTop: "15px"}}><i style={{fontSize: "36px"}}className="material-icons">settings</i></div></Grid>
                  <Grid item xs={8}/>
                  <Grid item xs={2}><div style={{float: "right", marginRight: "15px", marginTop: "15px", fontSize: "36px"}}><i style={{fontSize: "36px"}} className="material-icons" onClick={this.toggleDrawer('left', false)}>close</i></div></Grid>
                </Grid>
              </div>
              <AppBar position="static">
                <Tabs style={{backgroundColor: "#212529"}} value={value} onChange={this.handleTabChange} scrollable scrollButtons='auto'>
                  <Tab label="어휘" />
                  <Tab label="문법" />
                  <Tab label="저장한 단어" href="#basic-tabs" />
                  <Tab label="문법검색" />
                  <Tab label="사전" />
                </Tabs>
              </AppBar>
              {value === 0 && <div><Vocab/></div>}
              {value === 1 && <div><Grammar/></div>}
              {value === 2 && <div><SavedWords/></div>}
              {value === 3 && <div><GrammarSearch/></div>}
              {value === 4 && <div><Dictionary/></div>}
            </div>
          </div>
        </Drawer>
      </div>

    )
  }

}


const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = ({})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);