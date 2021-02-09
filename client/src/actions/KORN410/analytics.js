import {
  ANALYTICS_START_GRAMMAR_SEARCH_SESSION,
  ANALYTICS_END_GRAMMAR_SEARCH_SESSION,
  ANALYTICS_UPDATE_GRAMMAR_SEARCH,
  ANALYTICS_INIT_OVERVIEW
} from "../../constants/410-action-types";
import axios from 'axios'


export const startGrammarSearch = (story) => dispatch => {
  const date = new Date();
  const payload = {
      story: story.storyName,
      class: story.class,
      startSession: date.getTime(),
      endSession: null,
      searchHistory: [],
      grammarFrequency: {},
      mostFrequentWord: []
  }
  dispatch({
    type: ANALYTICS_START_GRAMMAR_SEARCH_SESSION,
    payload
  })


}

export const endGrammarSearch = () => dispatch => {
  const date = new Date();
  dispatch({
    type: ANALYTICS_END_GRAMMAR_SEARCH_SESSION,
    payload: date.getTime()
  })

}


export const updateGrammarSearch = (grammar) => dispatch => {
  dispatch({
    type: ANALYTICS_UPDATE_GRAMMAR_SEARCH,
    payload: grammar
  })
}

export const endGrammarSearchSession = () => dispatch => {
  const date= new Date();
  dispatch({
    type: ANALYTICS_END_GRAMMAR_SEARCH_SESSION,
    payload: date.getTime()
  })
}

export const initOverview = (className,storyName) => dispatch => {
  let date = new Date();
  let overViewPromiseArray = []
  overViewPromiseArray.push(axios.get(`/api/analytics/userActivity?className=${className}&storyName=${storyName}&date=${date.getTime()}`))
  overViewPromiseArray.push(axios.get(`/api/analytics/mostFrequentGrammar?className=${className}&storyName=${storyName}&date=${date.getTime()}`))
  let overView = []
  Promise.all(overViewPromiseArray).then(resp => {
    resp.forEach(function(aResult) {
      overView.push(...aResult.data)
    })
    dispatch({
      type: ANALYTICS_INIT_OVERVIEW,
      payload: overView
    })
  })
}
