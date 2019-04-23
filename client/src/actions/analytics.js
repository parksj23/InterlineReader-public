import {
  ANALYTICS_START_GRAMMAR_SEARCH_SESSION,
  ANALYTICS_END_GRAMMAR_SEARCH_SESSION,
  ANALYTICS_UPDATE_GRAMMAR_SEARCH,
} from "../constants/action-types";


export const startGrammarSearch = (story) => dispatch => {
  const date = new Date();
  const payload = {
      story,
      startSession: date.getTime(),
      endSession: null,
      searchHistory: [],
      grammarFrequency: {},
      mostFrequentWord: null
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
