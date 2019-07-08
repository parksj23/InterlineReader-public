import { ANALYTICS_UPDATE_GRAMMAR_SEARCH, ANALYTICS_START_GRAMMAR_SEARCH_SESSION, ANALYTICS_END_GRAMMAR_SEARCH_SESSION } from "../constants/action-types";
import sort from "fast-sort/sort.es5.min";
const initialState = {
  sessions: []
}
export default (state = initialState, action) => {
  let sessions
  let grammarSearch
  switch (action.type) {
    case ANALYTICS_START_GRAMMAR_SEARCH_SESSION:
      sessions = state.sessions;
      sessions.push(action.payload)
      return {
        ...state,
        sessions
      }
    case ANALYTICS_UPDATE_GRAMMAR_SEARCH:
      sessions = state.sessions
      grammarSearch = sessions[sessions.length - 1]
      grammarSearch.searchHistory.push(action.payload)
      if (action.payload in grammarSearch.grammarFrequency) grammarSearch.grammarFrequency[action.payload] = grammarSearch.grammarFrequency[action.payload] + 1;
      else {
        grammarSearch.grammarFrequency[action.payload] = 1
      }
      sessions.splice(sessions.length - 1, 1, grammarSearch)
      return {
        ...state,
        sessions: sessions
      }
    case ANALYTICS_END_GRAMMAR_SEARCH_SESSION:
      sessions = state.sessions
      grammarSearch = sessions[sessions.length - 1]
      grammarSearch.endSession = action.payload
      let sortedFrequentWords = []
      for (let anEntry in grammarSearch.grammarFrequency) {
        sortedFrequentWords.push({
          entryName: anEntry,
          frequency: grammarSearch.grammarFrequency[anEntry]
        })
      }
      sort(sortedFrequentWords).asc(u => u.frequency);
      let max = sortedFrequentWords[sortedFrequentWords.length - 1].frequency
      let mostFrequentWords = [];
      for (let index = sortedFrequentWords.length - 1; index >= 0; index--) {
        if (sortedFrequentWords[index].frequency === max) mostFrequentWords.push(sortedFrequentWords[index].entryName);
        else { break; }
      }
      grammarSearch.mostFrequentWord = mostFrequentWords
      sessions.splice(sessions.length - 1, 1, grammarSearch)
      return {
        ...state,
        sessions
      }
    default:
      return state;

  }
}