

import axios from "axios";
import {GET_VOCAB_AND_GRAMMAR_SUCCESS} from "../constants/action-types";


export const getVocabforStory = (story) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }



  axios.get(`/api/stories/${story}`, {params}).then(res=>{
    dispatch({
      type: GET_VOCAB_AND_GRAMMAR_SUCCESS,
      payload: res.data
    })
  })



}

