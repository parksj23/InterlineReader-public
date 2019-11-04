import {
  CHANGE_INSTRUCTOR_SELECTED_MENU,
  ADD_NEW_STORY,
  ADD_STORY_INFO,
  CLOSE_STATUS_BAR,
  INSTRUCTOR_INIT,
  INSTRUCTOR_GET_GRAMMAR,
  INSTRUCTOR_GET_VOCAB,
  INIT_EDIT_VOCAB,
  INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB,
  INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
  INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
  INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
  INSTRUCTOR_UPDATE_VOCAB, INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
  INSTRUCTOR_ADD_NEW_VOCAB,
  INSTRUCTOR_RESET_EDIT_VOCAB,
  INSTRUCTOR_DELETE_VOCAB
} from '../constants/action-types';
import axios from 'axios';


export const initInstructor = () => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  return new Promise((resolve, reject) => {
    axios.get("/api/instructor/", {params}).then(res => {
      dispatch({
        type: INSTRUCTOR_INIT,
        payload: res.data
      })
      resolve(res.data)
    })
  })
}

export const initEditVocab = (storyTitle) => dispatch => {
  let params = {
    responseType: 'application/json',
    storyTitle,
  }
  let payload = {};
  return new Promise( (resolve,reject) => {
    axios.get(`/api/stories/${storyTitle}`, {params}).then(res => {
      let vocabSearch = {}
      res.data.vocab.sort(function (a, b) {return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)})
      res.data.vocab.map(aVocab => {
        if(aVocab.korean.indexOf("(") >= -1 || aVocab.korean.indexOf(")") >= -1){
          let temp = aVocab.korean
          let cleanVocab = temp.replace("(", "\(");
          cleanVocab = cleanVocab.replace(")", "\)");
          vocabSearch[cleanVocab] = aVocab;
        }
        else{
          vocabSearch[aVocab.korean] = aVocab;
        }
      })
      payload["storyInfo"] = res.data.storyInfo
      payload["storyTitle"] = storyTitle
      payload["vocabList"] = res.data.vocab
      payload["vocabSearch"] = vocabSearch
      return res.data.storyInfo
    }).then( storyInfo => {
      axios.get(`/api/stories/${storyTitle}/storyText`, {params: {storyInfo}}).then(res => {
        let storyTextKorn = res.data.storyTextKorn;
        let storyTextEngl = res.data.storyTextEngl
        storyTextKorn = storyTextKorn.sort((a,b) => (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0))
        storyTextEngl = storyTextEngl.sort((a,b) => (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0))

        let rawKoreanText = ""
        storyTextKorn.map(aText => {
          rawKoreanText = rawKoreanText.concat(aText.text)
        })

        payload["storyTextEngl"] = storyTextEngl;
        payload["storyTextKorn"] = storyTextKorn;
        payload["selectedVocab"] = null
        payload["userHighlightedText"] = null
        payload['rawKoreanText'] = rawKoreanText

        payload['highlightTextUpdating'] = false
        payload['editVocabUpdating'] = false
        dispatch({
          type: INIT_EDIT_VOCAB,
          payload
        })
      })
    })
    resolve(payload);
  })
}

export const resetEditVocab =() => dispatch => {
  dispatch({
    type: INSTRUCTOR_RESET_EDIT_VOCAB,
    payload: null
  })
}

export const initEditGrammar = (storyTitle) => dispatch => {
  let params = {
    responseType: 'application/json',
    storyTitle,
  }
  let payload = {};
  return new Promise( (resolve,reject) => {
    axios.get(`/api/stories/${storyTitle}`, {params}).then(res => {
      res.data.vocab.sort(function (a, b) {return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)})
      payload["storyInfo"] = res.data.storyInfo
      payload["storyTitle"] = storyTitle
      payload["grammarList"] = res.data.grammar
      return res.data.storyInfo
    }).then( storyInfo => {
      axios.get(`/api/stories/${storyTitle}/storyText`, {params: {storyInfo}}).then(res => {
        let storyTextKorn = res.data.storyTextKorn;
        let storyTextEngl = res.data.storyTextEngl
        storyTextKorn = storyTextKorn.sort((a,b) => (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0))
        storyTextEngl = storyTextEngl.sort((a,b) => (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0))
        payload["storyTextEngl"] = storyTextEngl;
        payload["storyTextKorn"] = storyTextKorn;
        dispatch({
          type: INIT_EDIT_VOCAB,
          payload
        })
      })
    })
    resolve(payload);
  })
}

export const changeSelectedMenu =(headerName) => dispatch => {
  let payload ={
    headerName
  }
  dispatch({
    type: CHANGE_INSTRUCTOR_SELECTED_MENU,
    payload
  })
}

export const addToStory = (text,storyInfo) => dispatch => {
  let params = {
    text,
    storyInfo
  }

  axios.put('/api/instructor/addStory', params).then( res => {
    let message;
    console.log(res.data)
    if(res.data.status === 200){
      message = "Story added Successfully!"
    }
    else{
      message = "Error adding story. Story not saved."
    }

    dispatch({
      type: ADD_NEW_STORY,
      payload: {
        status: res.data.status === 200,
        message
      }
    })
  })





}

export const addStoryInfo = (storyInfo) => dispatch => {
  let params = {
    storyInfo
  }
  axios.put('/api/instructor/addStoryInfo', params).then(res => {
    dispatch({
      type: ADD_STORY_INFO,
      payload: null
    })
  })


}

export const handleStatusClose =() => dispatch => {
  dispatch({
    type: CLOSE_STATUS_BAR,
    payload: null
  })
}

export const getVocabulary = (storyInfo) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all',
    storyInfo
  }
  return new Promise((resolve, reject) => {
    axios.get("/api/instructor/getVocab", {params}).then(res => {
      dispatch({
        type: INSTRUCTOR_GET_VOCAB,
        payload: res.data
      })
      resolve(res.data)
    })
  })
}

export const getGrammar = (storyInfo) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all',
    storyInfo
  }
  return new Promise((resolve, reject) => {
    axios.get("/api/instructor/getGrammar", {params}).then(res => {
      dispatch({
        type: INSTRUCTOR_GET_GRAMMAR,
        payload: res.data
      })
      resolve(res.data)
    })
  })
}

export const getStoryInfo = storyName => dispatch => {


}

export const updateSelectedVocab = selectedVocab => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB,
    payload: selectedVocab
  })
}

export const clearSelectedVocab= () => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
    payload: null
  })
}

export const updateUserHighlightedText = text => dispatch => {
  dispatch({
    type: INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
    payload: text
  })
}

export const startUpdatingHighlightedText = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
    payload: null
  })
}

export const updateVocab = (vocab, storyTitle) => dispatch => {
  let params = {
    vocab,
    storyTitle
  }
  axios.put('/api/instructor/editVocab/updateVocab', params).then(resp => {
    console.log(resp.data)
    dispatch({
      type: INSTRUCTOR_UPDATE_VOCAB,
      payload: resp.data.vocab
    })
  })
}

export const startUpdatingEditVocab = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
    payload: null
  })
}

export const addNewVocabulary = (vocab, storyTitle) => dispatch => {
  let params ={
    vocab,
    storyTitle
  }
  axios.put('/api/instructor/editVocab/addVocab', params).then(resp => {
    dispatch({
      type: INSTRUCTOR_ADD_NEW_VOCAB,
      payload: resp.data.vocab
    })


  })
}

export const deleteVocab =(vocab, storyTitle) => dispatch => {
  let params = {
    vocab,
    storyTitle
  }
  axios.put("/api/instructor/editVocab/deleteVocab", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_DELETE_VOCAB,
      payload: resp.data.vocab
    })

  })

}