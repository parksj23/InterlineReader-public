import {GET_VOCAB_AND_GRAMMAR_SUCCESS} from '../constants/action-types';

const initialState = {
  language: "korean"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VOCAB_AND_GRAMMAR_SUCCESS:
      return {
        ...state,
        vocab: action.payload.vocab,
        grammar: action.payload.grammar
      };
    default:
      return state;
  }
}