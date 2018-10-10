import { combineReducers } from 'redux';
import auth from './auth';
import errors from './error';
import about from './about';
import dashboard from './dashboard';
import vocab from './vocab';
import stories from './stories';
import sideBar from './sideBar';


export default combineReducers({
  auth,
  errors,
  about,
  dashboard,
  vocab,
  stories,
  sideBar
});
