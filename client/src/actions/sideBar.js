

import axios from "axios";
import {
  TOGGLE_SIDEBAR,
  GET_SAVED_WORDS,
  GET_LIST_OF_SAVED_WORDS,
  UPDATE_SAVED_WORDS,
  ADD_SAVED_WORD, DELETE_SAVED_WORD,
  RESET_STATUS
} from "../constants/action-types";
import qs from "qs";


export const toggleSideBar = (isOpened, size) => dispatch => {
  let payload = {
    isOpened,
    size
  }
  dispatch({
    type: TOGGLE_SIDEBAR,
    payload
  })


}

export const toggleDrawer = (side, open) => dispatch => {
  let size = {
    width: document.getElementById('resizeContainer') ? document.getElementById('resizeContainer').offsetWidth - parseInt(window.getComputedStyle(document.getElementById('mainContainer')).marginLeft,10) :  "30vw",
    height: document.getElementById('resizeContainer') ? document.getElementById('resizeContainer').clientHeight : "100vh"
  }
  let payload = {
    isOpened: open,
    size
  }

  dispatch({
    type: TOGGLE_SIDEBAR,
    payload
  })
};

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

export const getSavedWords = (userId, story, savedWords, storyClass) => dispatch => {
  const params = {
    userId,
    story,
    savedWords
  }

  params["class"] = storyClass
  console.log(params)
  if(savedWords && savedWords.length > 0){
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
      payload: []
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
  console.log("updating Saved Words")
  axios.put(`/api/savedWords/updateSavedWords`, params).then(res=>{
    console.log(res.data)
    dispatch({
      type: UPDATE_SAVED_WORDS,
      payload: res.data.vocabList
    })
  })

}

export const handleStatusClose = () => dispatch => {
  dispatch({
    type: RESET_STATUS,
    payload: {}
  })
}

