import {GET_SAVED_WORDS} from '../constants/action-types';

const initialState = {
  savedWords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVED_WORDS:
      return{
        ...state,
        savedWords: action.payload.savedVocab
      }
    default:
      return state;
  }
}