import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/KORN410/auth';
import {updateDrawerSize} from '../../actions/KORN410/dashboard';
import {toggleSideBar} from "../../actions/KORN410/sideBar";
import SideBarButton from './common/sideBarButton';
import './style/navbar.css';

class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }

    toggleDrawer = (side, open) => () => {
        let width = document.getElementById('resizeContainer') ? document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft,10) : "30vw"
        let height = document.getElementById('resizeContainer') ? document.getElementById('resizeContainer').clientHeight : "100vh"
        let size = {
            width,
            height
        }

        this.props.toggleSideBar(open, size);
        this.setState({
            [side]: open,
        });
    };

    render() {
        const currentPath = this.props.location.pathname;
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        href=""
                        className="nav-link"
                        onClick={this.onLogoutClick}
                    >
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <SideBarButton toggleDrawer={this.toggleDrawer} isDisabled={this.props.sideBar.isButtonDisabled}/>
                    <div className="container">
                        <Link className="navbar-brand" to="/about">
                            Interline Reader
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                {/*<li className="nav-item">*/}
                                {/*    <Link className={currentPath==="/dashboard/modernKorean"? "selected-navbar": "nav-link"} to="/dashboard/modernKorean">*/}
                                {/*        Modern Korean*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <Link className={currentPath==="/dashboard/KORN410"? "selected-navbar": "nav-link"} to="/dashboard/KORN410">*/}
                                {/*        KORN 410*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    <Link className={currentPath==="/dashboard/KORN351"? "selected-navbar": "nav-link"} to="/dashboard/KORN351">
                                        KORN 351
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={currentPath==="/about"? "selected-navbar": "nav-link"} to="/about">
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={currentPath === "/KORN351/tutorial" ? "selected-navbar" : "nav-link"}
                                          to="/KORN351/tutorial">
                                        KORN351 User Guide
                                    </Link>
                                </li>
                                {/*{(Object.keys(user).length>=1 && !user.isStudent) && (*/}
                                {/*    <li className="nav-item">*/}
                                {/*        <Link className={currentPath.includes("/instructor410")? "selected-navbar": "nav-link"} to="/instructor410"> 410 Instructor Panel</Link>*/}
                                {/*    </li>)*/}
                                {/*}*/}
                                {(Object.keys(user).length>=1 && !user.isStudent) && (
                                    <li className="nav-item">
                                        <Link className={currentPath.includes("/instructor351")? "selected-navbar": "nav-link"} to="/instructor351"> 351 Instructor Panel</Link>
                                    </li>)
                                }
                            </ul>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    stories: state.stories,
    sideBar: state.sideBar
});

const mapDispatchToPRops = {
    logoutUser,
    toggleSideBar,
    updateDrawerSize
}

export default withRouter(connect(mapStateToProps, mapDispatchToPRops)(Navbar));
