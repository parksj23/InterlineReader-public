

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

 let payload = {};
  let storyInitPromise = []

  storyInitPromise.push(axios.get(`/api/stories/${story}/storyText`, {params}).then(res => {
    let storyTextKorn = res.data.storyTextKorn;
    let storyTextEngl = res.data.storyTextEngl
    storyTextKorn = storyTextKorn.sort((a,b) => (a.order_id > b.order_id) ? 1 : (a.order_id < b.order_id) ? -1 : 0)
    storyTextEngl = storyTextEngl.sort((a,b) => (a.order_id < a.order_id) ? 1 : (a.order_id < b.order_id) ? -1 : 0)
    payload["story"] = story;
    payload["storyTextEngl"] = storyTextEngl;
    payload["storyTextKorn"] = storyTextKorn
    return
  })
  )

  storyInitPromise.push(axios.get(`/api/stories/${story}/storyInfo`, {params}).then(res => {
    payload["storyInfo"] = res.data.storyInfo[0]
    return
  }))

  Promise.all(storyInitPromise).then(resp => {
    console.log(payload)
    dispatch({
      type: INIT_STORY,
      payload: payload
    })
  })
}

export const leaveStories = () => dispatch => {
  dispatch({
    type: LEAVE_STORY,
    payload: {}
  })
}