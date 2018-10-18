import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Vocab from './Vocab';
import Grammar from './Grammar';
import SavedWords from './SavedWords';
import GrammarSearch from './GrammarSearch';
import Dictionary from './Dictionary';
import './styles/sideBar.css';
import Resizable from 're-resizable';
import StatusMessage from '../statusMessage/statusMessage';
import {updateDrawerSize} from '../../../actions/dashboard';


import {toggleSideBar, getSavedWords, handleStatusClose} from "../../../actions/sideBar";

class SideBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      left: false,
      value: 0,
      openStatus: false
    }

    this.handleAddVocab.bind(this)
  }

  componentDidMount(){
    this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, [204])
  }

  toggleDrawer = (side, open) => () => {
    let size = {
      width: document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft),
      height: document.getElementById('resizeContainer').clientHeight
    }
    this.props.toggleSideBar(open, size);
    this.setState({
      [side]: open,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({value});
  };

  handleStatusClose = () =>{
    this.setState({
      openStatus: false
    })
  }

  handleAddVocab = (status) => {
    if(status === 'success') {
      this.setState({
        openStatus: true,
        statusStyle: {backgroundColor: '#42b35b'}
      })
    }
    else{
      this.setState({
        openStatus: true,
        statusStyle: {backgroundColor: '##d32f2f'}
      })
    }

  }

  onResize = (event, {}) => {
    let size = {
      width: document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft),
      height: document.getElementById('resizeContainer').clientHeight
    }
    this.props.updateDrawerSize(size)
  };

  render() {
    const pointerIcon = {cursor: 'pointer'};
    let {value} = this.state;
    const {vocab, grammar} = this.props;
    return (
      <div >
        <Tooltip disableFocusListener title="Open Drawer">
        <Button style={{color: "#FFFFFF"}} onClick={this.toggleDrawer('left', true)}>
          <i className="material-icons" style={{zoom: "1.5"}}>menu</i>
        </Button></Tooltip>
        <Drawer id={"DrawerContainer"} variant="persistent" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <Resizable
            defaultSize={{
              width: "40vw",
              height: "100vh",
            }}
            id={'resizeContainer'}
            onResize={this.onResize}
          >
          <div tabIndex={0} role="button">
            <div>
              <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}/>
                <Grid item xs={2}>
                  <div style={{float: "right", marginRight: "15px", marginTop: "15px", fontSize: "36px", cursor: "pointer"}}><i
                    style={{fontSize: "36px"}} className="material-icons"
                    onClick={this.toggleDrawer('left', false)}>close</i></div>
                </Grid>
              </Grid>
            </div>
            <AppBar position="static">
              <Tabs style={{backgroundColor: "#212529"}} value={value} onChange={this.handleTabChange} scrollable
                    scrollButtons='auto'>
                <Tab label="어휘"/>
                <Tab label="문법"/>
                <Tab label="저장한 단어" href="#basic-tabs"/>
                <Tab label="문법검색"/>
                <Tab label="사전"/>
              </Tabs>
            </AppBar>
            {value === 0 && <div style={{maxWidth: "100%"}}><Vocab vocab={vocab} addWord={this.handleAddVocab}/></div>}
            {value === 1 && <div><Grammar grammar={grammar}/></div>}
            {value === 2 && <div><SavedWords story={this.props.story}/></div>}
            {value === 3 && <div><GrammarSearch/></div>}
            {value === 4 && <div><Dictionary/></div>}
          </div>
          </Resizable>
        </Drawer>

        <StatusMessage status="success" open={this.props.openStatus} message={this.props.statusMessage} handleClose={this.props.handleStatusClose}/>
      </div>


    )
  }
}



const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id,
    openStatus: state.stories.openStatus,
    statusMessage: state.stories.statusMessage
  }
)

const mapDispatchToProps = ({toggleSideBar, getSavedWords, handleStatusClose, updateDrawerSize})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);