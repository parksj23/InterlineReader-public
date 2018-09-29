

import axios from "axios";
import {GET_VOCAB_SUCCESS, GET_VOCAB_REQUEST} from "../constants/action-types";


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

