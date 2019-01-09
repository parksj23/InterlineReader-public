import {
  GET_SAVED_WORDS,
  TOGGLE_SIDEBAR, UPDATE_DRAWER_SIZE, TOGGLE_SIDEBAR_BUTTON,
  ENABLE_SIDEBAR_BUTTON, RESET_SIDEBAR, ADD_SAVED_WORD, ADD_TO_SAVED_WORD,  REMOVE_FROM_SAVED_WORD
} from '../constants/action-types';

const initialState = {
  savedWords: [],
  drawerSize: {width: "0vw", height: "100vh"},
  isSideBarOpen: false,
  isButtonDisabled: true
};

export default (state = initialState, action) => {
  let savedWords;
  switch (action.type) {
    case GET_SAVED_WORDS:
      return{
        ...state,
        savedWords: action.payload.savedVocab
      }
    case UPDATE_DRAWER_SIZE:
        return {
          ...state,
          drawerSize: action.payload
        }
    case TOGGLE_SIDEBAR:
      return{
        ...state,
        isSideBarOpen: action.payload.isOpened,
        drawerSize: action.payload.size
      }
    case TOGGLE_SIDEBAR_BUTTON:
      return{
        ...state,
        isButtonDisabled: action.payload
      }
    case ENABLE_SIDEBAR_BUTTON:
      return {
        ...state,
        isButtonDisabled: false
      }
    case RESET_SIDEBAR:
      return{
        ...initialState
      }
    case ADD_TO_SAVED_WORD:
      savedWords = state.savedWords;
      savedWords.push(action.payload);
      return{
        ...state,
        savedWords

      }
    case REMOVE_FROM_SAVED_WORD:
      savedWords = state.savedWords;
      let index = savedWords.indexOf(action.payload);
      if(index > -1){
        savedWords.splice(index,1)
      }
      return{
        ...state,
        savedWords
      }
    default:
      return state;
  }
}