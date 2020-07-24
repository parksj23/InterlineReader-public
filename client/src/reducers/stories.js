import {
  GET_VOCAB_AND_GRAMMAR_SUCCESS,
  INIT_STORY,
  UPDATE_SAVED_WORDS,
  LEAVE_STORY,
  RESET_STATUS,
  RESET_STORIES,
  STORY_IS_LOADING,
  STORY_IS_NOT_LOADING,
  SAVE_HYPOTHESIS,
} from '../constants/action-types';

const initialState = {
  selectedLanguage: "",
  isSideBarOpen: false,
  openStatus: false,
  statusMessage:'',
  isStoryLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_STORY:
      return({
        ...state,
        ...action.payload,
        selectedLanguage: action.payload.MODKR ? "MODKR" : action.payload.MIDKR ? "MIDKR" : action.payload.HANMN ? "HANMN" : "ENGSH"
      })
    case GET_VOCAB_AND_GRAMMAR_SUCCESS:
      return {
        ...state,
        vocab: action.payload.vocab,
        grammar: action.payload.grammar,
      };
    case UPDATE_SAVED_WORDS:
      return {
        ...state,
        vocabList: action.payload
      }
    case LEAVE_STORY:
      return {
        ...initialState
      }
    case RESET_STATUS:
      return {
        ...state,
        openStatus: false,
        statusMessage: ""
      }
    case RESET_STORIES:
      return {
        ...initialState,
        hypothesisURL: action.payload
      }
    case STORY_IS_LOADING:
      return {
        ...state,
        isStoryLoading: true
      }
    case STORY_IS_NOT_LOADING:
      return {
        ...state,
        isStoryLoading: false
      }
    case SAVE_HYPOTHESIS:
      return {
        ...state,
        hypothesisURL: action.payload
      }
    default:
      return state;
  }
}