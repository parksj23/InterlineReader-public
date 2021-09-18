import './App.css';

import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {logoutUser, setCurrentUser} from './actions/KORN410/auth';

import About from "./components/About/AboutContainer";
import AboutNewBusu from "./KORN351/pages/Lessons/AboutNewBusu";
import AboutNewPhonetics from "./KORN351/pages/Lessons/AboutNewPhonetics";
import Cleaner from './components/Cleaner/CleanerContainer';
import DashboardContainer from "./components/dashboard/DashboardContainer";
import DictionaryHangulContainer from "./KORN351/pages/Okpyeon/OkpyeonHangulContainer";
import DictionaryLessonContainer from "./KORN351/pages/Okpyeon/OkpyeonLessonContainer";
import DictionaryRadicalContainer from './KORN351/pages/Okpyeon/OkpyeonRadicalContainer';
import EmailVerification from './components/auth/EmailVerification';
import Footer from './components/layout/Footer';
import ForgotPassword from './components/reset-password/ForgotPassword';
import Instructor from './components/instructor/instructorContainer';
import Instructor351 from './KORN351/pages/InstructorPanel/instructorContainer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import MainTextContainer from "./KORN351/pages/Lessons/MainTextContainer";
import Navbar from './components/layout/Navbar';
import NewBusuContainer from "./KORN351/pages/Lessons/NewBusuContainer";
import NewHanjaCombos from "./KORN351/pages/Lessons/NewHanjaCombos";
import NewHanjaContainer from "./KORN351/pages/Lessons/NewHanjaContainer";
import PrivateRoute from './components/common/PrivateRoute';
import {Provider} from 'react-redux';
import Quizzes from "./KORN351/pages/Quizzes/Quizzes";
import Register from './components/auth/Register';
import ResetPassword from './components/reset-password/ResetPassword';
import Story from "./components/stories/storiesContainer";
import Success from './components/common/Success';
import axios from 'axios'
import {endGrammarSearchSession} from './actions/KORN410/analytics'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import sort from "fast-sort/sort.es5.min";
import store from './store';
import {withCookies} from 'react-cookie';
import KORN351StudentTutorial from "./components/About/components/KORN351StudentTutorial";

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
    ;
}
;

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
        let {analytics, auth} = state;
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
                else {
                    break;
                }
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
                        <Navbar/>
                        <Route exact path='/' component={Landing}/>
                        <div id={'mainContainer'} className="mainContainer">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route path="/login/forgot" component={ForgotPassword}/>
                            <Route path="/login/reset_password/:id/:token" component={ResetPassword}/>
                            <Route path="/register/verify_email/:id/:token" component={EmailVerification}/>
                            <Route path="/success" component={Success}/>
                            <Route path="/about" component={About}/>
                            <Route path="/cleaner" component={Cleaner}/>
                            <Route exact path="/dashboard/KORN351/dictionary/radical"
                                   component={DictionaryRadicalContainer}/>
                            <Route exact path="/dashboard/KORN351/dictionary/hangul"
                                   component={DictionaryHangulContainer}/>
                            <Route exact path="/dashboard/KORN351/dictionary/lesson"
                                   component={DictionaryLessonContainer}/>
                            <Route exact path="/dashboard/KORN351/quizzes" component={Quizzes}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson" component={MainTextContainer}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson/new-hanja"
                                   component={NewHanjaContainer}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson/new-busu"
                                   component={NewBusuContainer}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson/building-word-power"
                                   component={MainTextContainer}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson/about-new-busu"
                                   component={AboutNewBusu}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson/about-new-phonetics"
                                   component={AboutNewPhonetics}/>
                            <Route exact path="/dashboard/KORN351/lesson/:lesson/new-hanja-combos"
                                   component={NewHanjaCombos}/>
                            <Switch>
                                <PrivateRoute path="/dashboard" component={DashboardContainer}/>
                                <PrivateRoute path='/story' component={Story} cookies={this.props.cookies}/>
                                <PrivateRoute path='/instructor410' component={Instructor}/>
                                <PrivateRoute path='/instructor351' component={Instructor351}/>
                                <PrivateRoute path="/KORN351/tutorial" component={KORN351StudentTutorial}/>
                            </Switch>

                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default withCookies(App);
