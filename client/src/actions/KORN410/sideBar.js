

import axios from "axios";
import {
  TOGGLE_SIDEBAR,
  GET_SAVED_WORDS,
  GET_LIST_OF_SAVED_WORDS,
    GET_LIST_OF_SAVED_GRAMMARS,
  UPDATE_SAVED_WORDS,
  ADD_SAVED_WORD, DELETE_SAVED_WORD,
  RESET_STATUS,
  ENABLE_SIDEBAR_BUTTON,
  RESET_SIDEBAR,
  ADD_TO_SAVED_WORD,
  REMOVE_FROM_SAVED_WORD,
    ADD_SAVED_GRAMMAR, DELETE_SAVED_GRAMMAR
} from "../../constants/410-action-types";


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

export const getListOfSavedWords = (userId, storyId) => dispatch => {
  let params = {
    userId,
    storyId
  }
  return new Promise ((resolve, reject) => {
    resolve(axios.get(`/api/savedWords/getListOfSavedWords`, {params}).then(res=> {
      if (res.data) {
        dispatch({
          type: GET_LIST_OF_SAVED_WORDS,
          payload: res.data.savedVocabIds
        })
      }
      return res.data
    }))
  })

}

export const getSavedWords = (userId, storyId, savedVocabIds, selectedLanguage) => dispatch => {
  const params = {
    userId,
    storyId,
    savedVocabIds,
    selectedLanguage
  }
  return new Promise ((resolve,reject) => {
    if(savedVocabIds && savedVocabIds.length > 0){
      resolve(axios.get(`/api/savedWords`, {params}).then(res=>{
        dispatch({
          type: GET_SAVED_WORDS,
          payload: res.data.savedVocab
        })
        return res.data
      }))
    }
    else{
      dispatch({
        type: GET_SAVED_WORDS,
        payload: []
      })
    }
    resolve([])
  })
}

export const addSavedWord = vocab => dispatch => {
  dispatch({
    type: ADD_SAVED_WORD,
    payload: vocab
  })
    alert('Selected vocabulary has been successfully added to the saved list.')
}

export const deleteSavedWord = vocab => dispatch => {
  dispatch({
    type: DELETE_SAVED_WORD,
    payload: vocab
  })
    alert('Selected vocabulary has been successfully removed from the saved list.')
}

export const updateSavedWords = params => dispatch => {
  axios.put(`/api/savedWords/updateSavedWords`, params).then(res=>{
    dispatch({
      type: UPDATE_SAVED_WORDS,
      payload: res.data.vocabList
    })
  })

}

export const getListOfSavedGrammars = (userId, storyId) => dispatch => {
    let params = {
        userId,
        storyId
    };
    return new Promise ((resolve, reject) => {
        resolve(axios.get(`/api/savedGrammars/getListOfSavedGrammars`, {params}).then(res=> {
            if (res.data) {
                dispatch({
                    type: GET_LIST_OF_SAVED_GRAMMARS,
                    payload: res.data.savedGrammarIds
                })
            }
            return res.data
        }))
    })
};


export const addSavedGrammar = (userId, storyId, savedGrammarIds, grammar, shouldAlert) => dispatch => {
    axios.put(`/api/savedGrammars/updateSavedGrammars`, {userId: userId , storyId: storyId, savedGrammarIds: savedGrammarIds.concat([grammar._id])}).then(res=>{
        dispatch({
            type: ADD_SAVED_GRAMMAR,
            payload: grammar
        });
        if (shouldAlert)
            alert('Selected grammar has been successfully added to the saved list.')
    })
}

export const deleteSavedGrammar = (userId, storyId, savedGrammarIds, shouldAlert) => dispatch => {
    axios.put(`/api/savedGrammars/updateSavedGrammars`, {userId: userId , storyId: storyId, savedGrammarIds: savedGrammarIds}).then(res=> {
        dispatch({
            type: DELETE_SAVED_WORD,
            payload: savedGrammarIds
        });
        if (shouldAlert)
            alert('Selected grammar has been successfully removed from the saved list.')
    })
}

export const handleStatusClose = () => dispatch => {
  dispatch({
    type: RESET_STATUS,
    payload: {}
  })
}

export const enableSideBarButton = () => dispatch =>{
  dispatch({
    type: ENABLE_SIDEBAR_BUTTON,
    payload: false
  })
}

export const resetSideBar = () => dispatch => {
  dispatch({
    type: RESET_SIDEBAR,
    payload: null
  })

}

export const addToSavedWords = (vocab) => dispatch => {
  dispatch({
    type: ADD_TO_SAVED_WORD,
    payload: vocab

  })
}

export const deleteSidebarSavedWord = (vocab) => dispatch => {
  dispatch({
    type: REMOVE_FROM_SAVED_WORD,
    payload: vocab
  })
}