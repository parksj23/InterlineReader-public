import {UPDATE_HIGHLIGHT_WORD, GET_VOCAB_SUCCESS} from '../constants/action-types';

const initialState = {
  highlightedWord: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VOCAB_SUCCESS:
      return {
        ...state,
        vocab: action.payload,
      };
    case UPDATE_HIGHLIGHT_WORD:
      return{
        ...state,
        highlightedWord: action.payload,
        kind: action.kind
      }

    default:
      return state;
  }
}