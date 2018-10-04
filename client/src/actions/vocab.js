

import axios from "axios";
import {GET_VOCAB_SUCCESS, UPDATE_HIGHLIGHT_WORD} from "../constants/action-types";


export const getVocabforStory = (story) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }

  const assetParams = {
    folder: '/korn/'
  }

  axios.get(`/api/${story}`, {params}).then(res=>{
    dispatch({
      type: GET_VOCAB_SUCCESS,
      payload: res.data
    })
  })



}

export const updateHighlightedWord = (vocabWord) => dispatch =>{
  dispatch({
    type: UPDATE_HIGHLIGHT_WORD,
    payload: vocabWord
  })


}

