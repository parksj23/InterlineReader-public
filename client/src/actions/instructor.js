import {CHANGE_INSTRUCTOR_SELECTED_MENU, ADD_NEW_STORY, GET_STORY_LIST, ADD_STORY_INFO, CLOSE_STATUS_BAR} from '../constants/action-types';
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

export const addToStory = (text,storyInfo) => dispatch => {
  let params = {
    text,
    storyInfo
  }

  axios.put('/api/instructor/addStory', params).then( res => {
    let message;
    console.log(res.data)
    if(res.data.status === 200){
      message = "Story added Successfully!"
    }
    else{
      message = "Error adding story. Story not saved."
    }

    dispatch({
      type: ADD_NEW_STORY,
      payload: {
        status: res.data.status === 200,
        message
      }
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

export const getStoryList = () => dispatch => {
  axios.get('/api/instructor/getStories').then(res => {
    dispatch({
      type: GET_STORY_LIST,
      payload: res.data
    })
  })



}

export const handleStatusClose =() => dispatch => {
  dispatch({
    type: CLOSE_STATUS_BAR,
    payload: null
  })
}