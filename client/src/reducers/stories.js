import {GET_LIST_OF_SAVED_WORDS, GET_VOCAB_AND_GRAMMAR_SUCCESS, TOGGLE_SIDEBAR, INIT_STORY, UPDATE_SAVED_WORDS} from '../constants/action-types';

const initialState = {
  language: "korean",
  isSideBarOpen: false,
  storyTitle: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_STORY:
      return({
        ...state,
        storyTitle: action.payload
      })
    case GET_VOCAB_AND_GRAMMAR_SUCCESS:
      return {
        ...state,
        vocab: action.payload.vocab,
        grammar: action.payload.grammar,
      };
    case TOGGLE_SIDEBAR:
      return{
        ...state,
        isSideBarOpen: action.payload
      }
    case GET_LIST_OF_SAVED_WORDS:
      return {
        ...state,
        vocabList: action.payload
      }
    case UPDATE_SAVED_WORDS:
      return {
        ...state,
        vocabList: action.payload
      }
    default:
      return state;
  }
}