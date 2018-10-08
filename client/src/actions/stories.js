

import axios from "axios";
import {GET_VOCAB_AND_GRAMMAR_SUCCESS, INIT_STORY} from "../constants/action-types";


export const getVocabforStory = (story) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  axios.get(`/api/stories/${story}`, {params}).then(res=>{
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
  dispatch({
    type: INIT_STORY,
    payload: story
  })

}
