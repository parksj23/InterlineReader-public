

import axios from "axios";
import {GET_VOCAB_AND_GRAMMAR_SUCCESS, INIT_STORY, LEAVE_STORY} from "../constants/action-types";


export const getVocabforStory = (story) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  axios.get(`/api/stories/${story}`, {params}).then(res=>{
    res.data.vocab.sort(function(a,b){
      return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)
    })

    let payload = {
      ...res.data,
      storyTitle: story
    }
    dispatch({
      type: GET_VOCAB_AND_GRAMMAR_SUCCESS,
      payload
    })
  })
}

export const initStory = (story) => dispatch => {
  const params = {
    responseType: 'application/json',
    storyTitle: story
  }

  axios.get(`/api/stories/${story}/storyText`, {params}).then(res => {
    dispatch({
      type: INIT_STORY,
      payload: {
        story,
        storyTextKorn: res.data.storyTextKorn,
        storyTextEngl: res.data.storyTextEngl
      }
    })

  })
}

export const leaveStories = () => dispatch => {
  dispatch({
    type: LEAVE_STORY,
    payload: {}
  })
}