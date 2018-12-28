import axios from "axios";
import {GET_VOCAB_AND_GRAMMAR_SUCCESS, INIT_STORY, LEAVE_STORY} from "../constants/action-types";


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

  axios.get(`/api/stories/${className}/${storyTitle}`, {params}).then(res => {
    res.data.vocab.sort(function (a, b) {return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)})
    res.data.grammar.sort(function (a, b) {return (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0)})
      payload["storyInfo"] = res.data.storyInfo
      payload["storyTitle"] = storyTitle
      payload["vocab"] = res.data.vocab
      payload["grammar"] = res.data.grammar
    return res.data.storyInfo
    }).then( storyInfo => {
    axios.get(`/api/stories/${className}/${storyTitle}/storyText`, {params: {storyInfo}}).then(res => {
      let storyTextKorn = res.data.storyTextKorn;
      let storyTextEngl = res.data.storyTextEngl
      storyTextKorn = storyTextKorn.sort((a,b) => (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0))
      storyTextEngl = storyTextEngl.sort((a,b) => (a.order_id < b.order_id ? -1 : (a.order_id > b.order_id) ? 1 : 0))
      payload["storyTextEngl"] = storyTextEngl;
      payload["storyTextKorn"] = storyTextKorn;

      dispatch({
        type: INIT_STORY,
        payload
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