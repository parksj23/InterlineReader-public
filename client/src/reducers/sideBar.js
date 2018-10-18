import {GET_SAVED_WORDS, TOGGLE_SIDEBAR, UPDATE_DRAWER_SIZE} from '../constants/action-types';

const initialState = {
  savedWords: [],
  drawerSize: {width: "0vw", height: "100vh"},
  isSideBarOpen: false
};

export default (state = initialState, action) => {
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
    default:
      return state;
  }
}