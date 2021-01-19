import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/auth';
import { endGrammarSearchSession } from './actions/analytics'
import setAuthToken from './utils/setAuthToken';
import { withCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios'
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
import Cleaner from './components/Cleaner/CleanerContainer';
import About from "./components/About/AboutContainer";
import Story from "./components/stories/storiesContainer";
import Instructor from './components/instructor/instructorContainer';
import DictionaryRadicalContainer from './KORN351/pages/DictionaryRadicalContainer';

import './App.css';
import sort from "fast-sort/sort.es5.min";
import DictionaryLessonContainer from "./KORN351/pages/DictionaryLessonContainer";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  };
};

class App extends Component {
  constructor() {
    super()
    this.unload.bind(this)
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.unload);

  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.unload);
  }

  unload = (e) => {

    let state = store.getState()
    let { analytics, auth } = state;
    let date = new Date();

    if (analytics.sessions.length > 0) endGrammarSearchSession();

    if (auth.user.isStudent || true) {

      let lastSession = analytics.sessions[analytics.sessions.length - 1];
      lastSession.endSession = date.getTime()

      let sortedFrequentWords = []
      for (let anEntry in lastSession.grammarFrequency) {
        sortedFrequentWords.push({
          entryName: anEntry,
          frequency: lastSession.grammarFrequency[anEntry]
        })
      }
      sort(sortedFrequentWords).asc(u => u.frequency);
      let max = sortedFrequentWords[sortedFrequentWords.length - 1].frequency
      let mostFrequentWords = [];
      for (let index = sortedFrequentWords.length - 1; index >= 0; index--) {
        if (sortedFrequentWords[index].frequency === max) mostFrequentWords.push(sortedFrequentWords[index].entryName);
        else { break; }
      }

      lastSession.mostFrequentWord = mostFrequentWords;

      let params = {
        id: auth.user.id,
        sessions: analytics.sessions
      }
      axios.put('/api/analytics/addSessions', params).then(resp => {
        console.log(e)
      })
    }

    e.preventDefault();
    return e.returnValue = "See you next time!"
  }


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div id={'mainContainer'} className="mainContainer">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route path="/login/forgot" component={ForgotPassword} />
              <Route path="/login/reset_password/:id/:token" component={ResetPassword} />
              <Route path="/register/verify_email/:id/:token" component={EmailVerification} />
              <Route path="/success" component={Success} />
              <Route path="/about" component={About} />
              <Route path="/cleaner" component={Cleaner} />
              <Route exact path="/dashboard/KORN351/dictionary/radical" component={DictionaryRadicalContainer} />
                <Route exact path="/dashboard/KORN351/dictionary/lesson" component={DictionaryLessonContainer} />
              <Switch>
                <PrivateRoute path="/dashboard" component={DashboardContainer} />
                  <PrivateRoute path='/story' component={Story} cookies={this.props.cookies}/>
                <PrivateRoute path='/instructor' component={Instructor} />
              </Switch>

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withCookies(App);
