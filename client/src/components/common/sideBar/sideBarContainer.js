import React, {Component} from "react";
import {connect} from "react-redux";
import './styles/sideBar.css';
import {updateDrawerSize} from '../../../actions/dashboard';
import SideBar from './components/sideBar';
import {toggleSideBar, getSavedWords, handleStatusClose} from "../../../actions/sideBar";

class SideBarContainer extends Component {

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
      width: document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft,10),
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
      <div >
        <SideBar vocab={vocab}
                 tab={value || 0}
                 grammar={grammar}
                 onResize={this.onResize}
                 left={this.state.left}
                 toggleDrawer={this.toggleDrawer}
                 handleChange={this.handleTabChange}
                 handleAddVocab={this.handleAddVocab}
                 story={this.props.story}
                 openStatus={this.props.openStatus}
                 statusMessage={this.props.statusMessage}
                 handleStatusClose={this.props.handleStatusClose}
                 handleTabChange={this.handleTabChange.bind(this)}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);