import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import  SideBar from '../common/sideBar/sideBarContainer';

class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }


  render() {

    const { isAuthenticated, user } = this.props.auth;
    const {stories} = this.props;
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
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        {
          stories && stories.storyTitle? <div className='sideBarContainer'>
            <SideBar vocab={stories.vocab} grammar={stories.grammar} story={stories.storyTitle} onResize={this.onResize}/>
          </div> : null
        }
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
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  stories: state.stories
});

export default connect(mapStateToProps, { logoutUser})(Navbar);
