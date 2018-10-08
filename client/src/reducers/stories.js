import {GET_LIST_OF_SAVED_WORDS, GET_VOCAB_AND_GRAMMAR_SUCCESS, TOGGLE_SIDEBAR} from '../constants/action-types';

const initialState = {
  language: "korean",
  isSideBarOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VOCAB_AND_GRAMMAR_SUCCESS:
      return {
        ...state,
        vocab: action.payload.vocab,
        grammar: action.payload.grammar
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
    default:
      return state;
  }
}