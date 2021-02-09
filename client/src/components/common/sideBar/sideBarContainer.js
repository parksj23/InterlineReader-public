import React, {Component} from "react";
import {connect} from "react-redux";
import './styles/sideBar.css';
import {updateDrawerSize} from '../../../actions/KORN410/dashboard';
import SideBar from './components/sideBar';
import {toggleSideBar, getSavedWords, handleStatusClose, toggleDrawer, getListOfSavedWords} from "../../../actions/KORN410/sideBar";

class SideBarContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      left: false,
      value: 0,
      openStatus: false,
    }

    this.handleAdd.bind(this)
  }

  componentWillMount(){
  }

  componentDidMount(){
    window.changeScrollBar();
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

    handleAdd = (status) => {
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
                 handleAdd={this.handleAdd}
                 story={this.props.story}
                 openStatus={this.props.openStatus}
                 statusMessage={this.props.sideBar.statusMessage}
                 handleStatusClose={this.props.handleStatusClose}
                 handleTabChange={this.handleTabChange.bind(this)}
                 storyInfo={this.props.stories.storyInfo}
        />
    )
  }
}



const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id,
    openStatus: state.stories.openStatus,
    sideBar: state.sideBar,
    auth: state.auth
  }
)

const mapDispatchToProps = ({toggleSideBar, getSavedWords, handleStatusClose, updateDrawerSize, toggleDrawer, getListOfSavedWords})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);