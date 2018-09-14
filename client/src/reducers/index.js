import { combineReducers } from 'redux';
import auth from './auth';
import errors from './error';
import about from './about';


export default combineReducers({
  auth,
  errors,
  about
});
