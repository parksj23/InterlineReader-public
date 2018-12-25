import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import { Provider } from 'react-redux';
import store from './store';


import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import EmailVerification from './components/auth/EmailVerification';
import DashboardContainer from './components/dashboard/DashboardContainer';
import ForgotPassword from './components/reset-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';
import Success from './components/common/Success';
import About from "./components/About/AboutContainer";
import Story from "./components/stories/storiesContainer";
import Instructor from './components/instructor/instructorContainer';



import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  };
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div id={'mainContainer'} className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route path="/login/forgot" component={ForgotPassword} />
              <Route path="/login/reset_password/:id/:token" component={ResetPassword} />
              <Route path="/register/verify_email/:id/:token" component={EmailVerification} />
              <Route path="/success" component={Success} />
              <Route path="/about" component={About} />
              <Switch>
                <PrivateRoute path="/dashboard" component={DashboardContainer} />
                <PrivateRoute path='/story/:class/:storyName' component={Story}/>
                <PrivateRoute path='/instructor' component={Instructor}/>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
