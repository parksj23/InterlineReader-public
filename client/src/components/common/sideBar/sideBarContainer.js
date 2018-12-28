import React, {Component} from "react";
import {connect} from "react-redux";
import './styles/sideBar.css';
import {updateDrawerSize} from '../../../actions/dashboard';
import SideBar from './components/sideBar';
import {toggleSideBar, getSavedWords, handleStatusClose, toggleDrawer} from "../../../actions/sideBar";

class SideBarContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      left: false,
      value: 0,
      openStatus: false,
    }

    this.handleAddVocab.bind(this)
  }

  componentWillMount(){
   
  }

  componentDidMount(){
    window.changeScrollBar();
    let {storyInfo, vocabList}  = this.props.stories
    if(storyInfo && vocabList && storyInfo.class){
      console.log("component did mount")

      this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, vocabList.vocabList, storyInfo.class)
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.sideBar.isSideBarOpen !== this.props.sideBar.isSideBarOpen) {
      this.setState({
        left: this.props.sideBar.isSideBarOpen
      })
    }
  }


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
  onResize = () => {
    let size = {
      width: document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft,10),
      height: document.getElementById('resizeContainer').clientHeight
    }
    this.props.updateDrawerSize(size)
  };

  render() {
    let {value} = this.state;
    const {vocab, grammar} = this.props;
    return (
        <SideBar vocab={vocab}
                 tab={value || 0}
                 grammar={grammar}
                 onResize={this.onResize}
                 left={this.state.left}
                 toggleDrawer={this.props.toggleDrawer}
                 handleChange={this.handleTabChange}
                 handleAddVocab={this.handleAddVocab}
                 story={this.props.story}
                 openStatus={this.props.openStatus}
                 statusMessage={this.props.statusMessage}
                 handleStatusClose={this.props.handleStatusClose}
                 handleTabChange={this.handleTabChange.bind(this)}
        />
    )
  }
}



const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id,
    openStatus: state.stories.openStatus,
    statusMessage: state.stories.statusMessage,
    sideBar: state.sideBar
  }
)

const mapDispatchToProps = ({toggleSideBar, getSavedWords, handleStatusClose, updateDrawerSize, toggleDrawer})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);