import axios from "axios";
import {
  GET_VOCAB_AND_GRAMMAR_SUCCESS,
  INIT_STORY,
  LEAVE_STORY,
  RESET_STORIES,
  STORY_IS_LOADING, STORY_IS_NOT_LOADING,
  SAVE_HYPOTHESIS
} from "../constants/action-types";


export const getVocabforStory = (story, storyInfo) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all',
    storyInfo
  }
  axios.get(`/api/stories/${storyInfo.class}/${story}`, {params}).then(res => {
    res.data.vocab.sort(function (a, b) {
      return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)
    })

    let payload = {
      ...res.data,
      storyTitle: story
    }
    dispatch({
      type: GET_VOCAB_AND_GRAMMAR_SUCCESS,
      payload
    })
  })
}

export const initStory = (storyTitle, className) => dispatch => {
  let params = {
    responseType: 'application/json',
    storyTitle,
    className
  }
  let payload = {};
  return new Promise( (resolve,reject) => {
    axios.get(`/api/stories/${storyTitle}`, {params}).then(res => {
      let languages = res.data.storyInfo.languages
      languages.map(aLanguage => {
        let data = res.data[`${aLanguage}`]
        if(data.vocabOrder && data.vocabList){
          let {vocabOrder, vocabList} = data
          let order = vocabOrder.order
          vocabList.sort(function(a,b){
            return order.indexOf(a._id) - order.indexOf(b._id);
          })
        }
        if(data.grammarOrder && data.grammarList){
          let {grammarOrder, grammarList} = data
          let order = grammarOrder.order
          grammarList.sort(function(a,b){
            return order.indexOf(a._id) - order.indexOf(b._id);
          })
        }
      })
      payload = res.data
      return res.data.storyInfo
    }).then( storyInfo => {
      axios.get(`/api/stories/${storyTitle}/storyText`, {params: {storyInfo}}).then(res => {
        let languages = Object.keys(res.data)
        languages.map(aLanguage => {
          payload[aLanguage] = {
            ...payload[aLanguage],
            storyText: res.data[aLanguage]
          }
        })

        dispatch({
          type: INIT_STORY,
          payload
        })
        resolve(payload);
      })
    })
  })
}

export const leaveStories = () => dispatch => {

  dispatch({
    type: LEAVE_STORY,
    payload: {}
  })
}

export const resetSTories = (url) => dispatch => {
  dispatch({
    type: RESET_STORIES,
    payload: url
  })
}

export const enableLoading = () => dispatch => {
  dispatch({
    type: STORY_IS_LOADING,
    payload: null
  })
}

export const disableLoading = () => dispatch => {
  dispatch({
    type: STORY_IS_NOT_LOADING,
    payload: null
  })
}

export const saveHypothesisLink = (url) => dispatch => {
  dispatch({
    type: SAVE_HYPOTHESIS,
    payload: url
  })
}