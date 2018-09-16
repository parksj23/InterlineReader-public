import { combineReducers } from 'redux';
import auth from './auth';
import errors from './error';
import about from './about';
import dashboard from './dashboard'


export default combineReducers({
  auth,
  errors,
  about,
  dashboard
});
