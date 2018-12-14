import {CHANGE_INSTRUCTOR_SELECTED_MENU, INSTRUCTOR_INIT, ADD_NEW_STORY, ADD_STORY_INFO} from '../constants/action-types';
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

export const addToStory = (text, language, storyInfo) => dispatch => {
  let params = {
    text,
    language: language,
    storyInfo
  }

  axios.put('/api/instructor/addStory', params).then( res => {
    dispatch({
      type: ADD_NEW_STORY,
      payload: null
    })
  })





}

export const addStoryInfo = (storyInfo) => dispatch => {
  let params = {
    storyInfo
  }
  axios.put('/api/instructor/addStoryInfo', params).then(res => {
    dispatch({
      type: ADD_STORY_INFO,
      payload: null
    })
  })


}