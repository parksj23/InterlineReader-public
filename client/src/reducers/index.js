import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import errors from './error';
import about from './about';
import dashboard from './dashboard';
import vocab from './vocab';
import stories from './stories';
import sideBar from './sideBar';
import instructor from './instructor';
import analytics from './analytics'


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
  analytics
});
