import {
  CHANGE_INSTRUCTOR_SELECTED_MENU,
  ADD_NEW_STORY,
  ADD_STORY_INFO,
  CLOSE_STATUS_BAR,
  INSTRUCTOR_INIT,
  INSTRUCTOR_GET_GRAMMAR,
  INSTRUCTOR_GET_VOCAB,
  INIT_EDIT_VOCAB,
  INIT_EDIT_GRAMMAR,
  INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB,
  INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR,
  INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
  INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
  INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
  INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR,
  INSTRUCTOR_UPDATE_VOCAB,
  INSTRUCTOR_UPDATE_GRAMMAR,
  INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
  INSTRUCTOR_ADD_NEW_VOCAB,
  INSTRUCTOR_ADD_NEW_GRAMMAR,
  INSTRUCTOR_RESET_EDIT_VOCAB,
  INSTRUCTOR_RESET_EDIT_GRAMMAR,
  INSTRUCTOR_DELETE_VOCAB,
  INSTRUCTOR_DELETE_GRAMMAR,
  INSTRUCTOR_CANCEL_SELECTION,
  GET_STORY_LIST
} from '../constants/action-types';
import axios from 'axios';


export const initInstructor = (storyList) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  return new Promise((resolve, reject) => {
    axios.get("/api/instructor/", {params}).then(res => {
      if(!storyList) {
        axios.get("/api/dashboard/", {params}).then(response => {
          dispatch({
            type: GET_STORY_LIST,
            payload: response.data
          })
          resolve(response.data)
        })
      }
      dispatch({
        type: INSTRUCTOR_INIT,
        payload: res.data
      })
      resolve(res.data)
    })
  })
}

export const initEditVocab = (storyTitle => dispatch => {
  let params = {
    responseType: 'application/json',
    storyTitle
  }
  return new Promise( (resolve,reject) => {
    let payload = {}
    axios.get(`/api/stories/${storyTitle}`, {params}).then(res => {
      let languages = res.data.storyInfo.languages

      let storyInfo = res.data.storyInfo

      languages.map(aLanguage => {
        let data = res.data[`${aLanguage}`]
        if(data.vocabOrder && data.vocabList){
          let {vocabOrder, vocabList} = data
          let order = vocabOrder.order
          vocabList.sort(function(a,b){
            return order.indexOf(a) - order.indexOf(b);
          })

          let vocabSearch = {}
          vocabList.map(aVocab => {
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

          res.data[`${aLanguage}`] = {
            vocabOrder,
            vocabList,
            vocabSearch
          }

          payload = res.data
        }

        axios.get(`/api/stories/${storyTitle}/storyText`, {params: {storyInfo}}).then(res => {
          let languages = Object.keys(res.data)
          languages.map(aLanguage => {
            let rawKoreanText = "";
            let storyText = res.data[aLanguage];
            
            storyText.map(aText => {
              rawKoreanText = rawKoreanText.concat(aText.text);
            })
            payload[aLanguage] = {
              ...payload[aLanguage],
              storyText: res.data[aLanguage],
              rawKoreanText
            }
          })
          dispatch({
            type: INIT_EDIT_VOCAB,
            payload
          })
          resolve(payload);
        })

        /*if(data.grammarOrder && data.grammarList){
          let {grammarOrder, grammarList} = data
          let order = grammarOrder.order
          grammarList.sort(function(a,b){
            return order.indexOf(a) - order.indexOf(b);
          })
        }*/
      })
    })
  })
})

export const resetEditVocab =() => dispatch => {
  dispatch({
    type: INSTRUCTOR_RESET_EDIT_VOCAB,
    payload: null
  })
}

export const resetEditGrammar = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_RESET_EDIT_GRAMMAR,
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
    let payload = {}
    axios.get(`/api/stories/${storyTitle}`, {params}).then(res => {
      let languages = res.data.storyInfo.languages

      let storyInfo = res.data.storyInfo

      languages.map(aLanguage => {
        let data = res.data[`${aLanguage}`]
        if(data.grammarOrder && data.grammarList){
          let {grammarOrder, grammarList} = data
          let order = grammarOrder.order
          grammarList.sort(function(a,b){
            return order.indexOf(a) - order.indexOf(b);
          })

          let grammarSearch = {}
          grammarList.map(aGrammar => {
            if(aGrammar.sentence.indexOf("(") >= -1 || aGrammar.korean.indexOf(")") >= -1){
              let temp = aGrammar.sentence
              let cleanGrammar = temp.replace("(", "\\(");
              cleanGrammar= cleanGrammar.replace(")", "\\)");
              grammarSearch[cleanGrammar] = aGrammar;
            }
            else{
              grammarSearch[aGrammar.sentence] = aGrammar;
            }

          res.data[`${aLanguage}`] = {
            grammarOrder,
            grammarList,
            grammarSearch
          }

          payload = res.data
        })
      }
        axios.get(`/api/stories/${storyTitle}/storyText`, {params: {storyInfo}}).then(res => {
          let languages = Object.keys(res.data)
          languages.map(aLanguage => {
            let rawKoreanText = "";
            let storyText = res.data[aLanguage];
            
            storyText.map(aText => {
              rawKoreanText = rawKoreanText.concat(aText.text);
            })
            payload[aLanguage] = {
              ...payload[aLanguage],
              storyText: res.data[aLanguage],
              rawKoreanText
            }
          })
          dispatch({
            type: INIT_EDIT_GRAMMAR,
            payload
          })
          resolve(payload);
        })
      })
  })
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
  console.log(storyInfo)
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

export const updateSelectedGrammar = (selectedGrammar) => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR,
    payload: selectedGrammar
  })
}

export const clearSelectedVocab= () => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
    payload: null
  })
}

export const updateUserHighlightedText = (text, component) => dispatch => {
  let payload = {
    text,
    component
  }
  dispatch({
    type: INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
    payload
  })
}

export const startUpdatingHighlightedText = (component) => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
    payload: component
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

export const updateGrammar = (grammar, storyTitle) => dispatch => {
  let params = {
    grammar,
    storyTitle
  }
  axios.put('/api/instructor/editGrammar/updateGrammar', params).then(resp => {
    dispatch({
      type: INSTRUCTOR_UPDATE_GRAMMAR,
      payload: resp.data.grammar
    })
  })


}

export const startUpdatingEditVocab = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
    payload: null
  })
}

export const startUpdatingEditGrammar = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR,
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

export const addNewGrammar = (grammar, storyTitle) => dispatch => {
  let params ={
    grammar,
    storyTitle
  }
  axios.put('/api/instructor/editGrammar/addGrammar', params).then(resp => {
    dispatch({
      type: INSTRUCTOR_ADD_NEW_GRAMMAR,
      payload: resp.data.grammar
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

export const deleteGrammar =(grammar, storyTitle) => dispatch => {
  let params = {
    grammar,
    storyTitle
  }
  axios.put("/api/instructor/editGrammar/deleteGrammar", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_DELETE_GRAMMAR,
      payload: resp.data.grammar
    })

  })

}

export const cancelSelection =() => dispatch => {
  dispatch({
    type: INSTRUCTOR_CANCEL_SELECTION,
    payload: null
  })
}