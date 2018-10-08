import {GET_SAVED_WORDS} from '../constants/action-types';

const initialState = {
  user: "",
  savedWords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVED_WORDS:
      return{
        ...state,
        savedWords: action.payload
      }
    default:
      return state;
  }
}