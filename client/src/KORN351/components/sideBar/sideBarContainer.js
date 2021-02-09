import React, {Component} from "react";
import {connect} from "react-redux";
import './sideBar.css';
import {updateDrawerSize} from '../../../actions/KORN410/dashboard';
import {toggleDrawer} from '../../../actions/KORN410/sideBar';
import SideBar from './sideBar';

class SideBarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            left: false,
            value: 0,
            openStatus: false,
        };
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
    };

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
    };

    onResize = () => {
        let size = {
            width: document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft,10),
            height: document.getElementById('resizeContainer').clientHeight
        };
        this.props.updateDrawerSize(size)
    };

    render() {
        let {value} = this.state;
        return (
            <SideBar tab={value || 0} onResize={this.onResize}
                     left={this.state.left}
                     toggleDrawer={this.props.toggleDrawer}
                     handleChange={this.handleTabChange}
                     handleAdd={this.handleAdd}
                     handleTabChange={this.handleTabChange}
                     openStatus={this.props.openStatus}
            />
        )
    }
}

const mapStateToProps = state => (
    {
        openStatus: state.stories.openStatus,
        sideBar: state.sideBar
    }
);

export default connect(mapStateToProps, {updateDrawerSize, toggleDrawer})(SideBarContainer);
