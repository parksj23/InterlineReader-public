

import axios from "axios";
import {
  TOGGLE_SIDEBAR,
  GET_SAVED_WORDS,
  GET_LIST_OF_SAVED_WORDS,
  UPDATE_SAVED_WORDS,
  ADD_SAVED_WORD, DELETE_SAVED_WORD
} from "../constants/action-types";


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
  if(savedWords.length > 0){
    axios.get(`/api/savedWords`, {params}).then(res=>{
      dispatch({
        type: GET_SAVED_WORDS,
        payload: res.data
      })
    })
  }
  else{
    dispatch({
      type: GET_SAVED_WORDS,
      payload: savedWords
    })
  }
}

export const addSavedWord = vocab => dispatch => {
  dispatch({
    type: ADD_SAVED_WORD,
    payload: vocab
  })

}

export const deleteSavedWord = vocab => dispatch => {
  dispatch({
    type: DELETE_SAVED_WORD,
    payload: vocab
  })

}

export const updateSavedWords = params => dispatch => {
  axios.put(`/api/savedWords/updateSavedWords`, params).then(res=>{
    dispatch({
      type: UPDATE_SAVED_WORDS,
      payload: res.data.vocabList
    })
  })

}

