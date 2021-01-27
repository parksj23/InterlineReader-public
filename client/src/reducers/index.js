import { combineReducers } from 'redux';
import app from './KORN410/app';
import auth from './KORN410/auth';
import errors from './KORN410/error';
import about from './KORN410/about';
import dashboard from './KORN410/dashboard';
import vocab from './KORN410/vocab';
import stories from './KORN410/stories';
import sideBar from './KORN410/sideBar';
import instructor from './KORN410/instructor';
import analytics from './KORN410/analytics';
import okpyeon from './KORN351/Okpyeon';
import lessons from './KORN351/Lessons';


export default combineReducers({
    app,
    auth,
    errors,
    about,
    dashboard,
    vocab,
    stories,
    sideBar,
    instructor,
    analytics,
    okpyeon,
    lessons
});
