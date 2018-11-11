import {CHANGE_INSTRUCTOR_SELECTED_MENU, INSTRUCTOR_INIT, ADD_NEW_STORY} from '../constants/action-types';
import axios from 'axios';


/*export const instructorInit = dispatch => {
  dispatch({
    type: INSTRUCTOR_INIT,
    payload: null
  })

}*/

export const changeSelectedMenu =(newMenu) => dispatch => {
  dispatch({
    type: CHANGE_INSTRUCTOR_SELECTED_MENU,
    payload: newMenu
  })
}

export const addToStory = (text, language) => dispatch => {
  let params = {
    text,
    language: language
  }

  axios.put('/api/instructor/addStory', params).then( res => {
    dispatch({
      type: ADD_NEW_STORY,
      payload: null
    })
  })





}