

import axios from "axios";
import {TOGGLE_SIDEBAR, GET_SAVED_WORDS, GET_LIST_OF_SAVED_WORDS} from "../constants/action-types";


export const addVocabToSavedWords = (vocab) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }

}

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
  axios.get(`/api/getSavedWords/getListOfSavedWords`, {params}).then(res=> {
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
  axios.get(`/api/getSavedWords`, {params}).then(res=>{
    console.log(res.data)
    dispatch({
      type: GET_SAVED_WORDS,
      payload: res.data
    })
  })
}

