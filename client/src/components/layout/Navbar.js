import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import {updateDrawerSize} from '../../actions/dashboard';
import {toggleSideBar} from "../../actions/sideBar";
import SideBarButton from './common/sideBarButton';



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
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <SideBarButton toggleDrawer={this.toggleDrawer} isDisabled={this.props.sideBar.isButtonDisabled}/>
          <div className="container">
            <Link className="navbar-brand" to="/">
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
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Stories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                {(Object.keys(user).length>=1 && !user.isStudent) && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/instructor"> Instructor Panel</Link>
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

export default connect(mapStateToProps, mapDispatchToPRops)(Navbar);
