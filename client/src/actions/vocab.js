

import axios from "axios";
import {GET_VOCAB_SUCCESS, UPDATE_HIGHLIGHT_WORD} from "../constants/action-types";


export const getVocabforStory = (story) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }

  axios.get(`/api/${story}`, {params}).then(res=>{
    let data = res.data.sort(function(a,b){

      return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)

    })

    dispatch({
      type: GET_VOCAB_SUCCESS,
      payload: data
    })
  })



}

export const updateHighlightedWord = (vocabWord) => dispatch =>{
  dispatch({
    type: UPDATE_HIGHLIGHT_WORD,
    payload: vocabWord
  })


}

