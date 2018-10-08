

import axios from "axios";
import {TOGGLE_SIDEBAR, GET_SAVED_WORDS, GET_LIST_OF_SAVED_WORDS} from "../constants/action-types";


export const toggleSideBar = (isOpened) => dispatch => {

  dispatch({
    type: TOGGLE_SIDEBAR,
    payload: isOpened
  })


}

export const getListOfSavedWords = (userId, story) => dispatch => {
  let params = {
    userId,
    story
  }
  axios.get(`/api/savedWords/getListOfSavedWords`, {params}).then(res=> {
    console.log(res)
    if (res.data) {
      dispatch({
        type: GET_LIST_OF_SAVED_WORDS,
        payload: res.data.vocabList
      })
    }
  })
}

export const getSavedWords = (userId, story, savedWords=[]) => dispatch => {
  const params = {
    userId,
    story,
    savedWords
  }

  // if(savedWords.length == 0) return;
  axios.get(`/api/savedWords`, {params}).then(res=>{
    dispatch({
      type: GET_SAVED_WORDS,
      payload: res.data
    })
  })
}

export const addSavedWord = vocab => dispatch => {
  console.log(vocab);
  axios.put(`/api/savedWords/addSavedWord`, vocab).then(res=>{

  })

}

export const deleteSavedWord = orderId => dispatch => {
  const params = {
    orderId
  }

  axios.post(`/api/savedWords/deleteSavedWord`, {params}).then(res=>{

  })

}

