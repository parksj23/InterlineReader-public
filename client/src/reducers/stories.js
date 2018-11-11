import {
  GET_LIST_OF_SAVED_WORDS,
  GET_VOCAB_AND_GRAMMAR_SUCCESS,
  INIT_STORY,
  UPDATE_SAVED_WORDS,
  ADD_SAVED_WORD, DELETE_SAVED_WORD, LEAVE_STORY,
  RESET_STATUS
} from '../constants/action-types';

const initialState = {
  language: "korean",
  isSideBarOpen: false,
  storyTitle: "",
  openStatus: false,
  statusMessage:''
};

export default (state = initialState, action) => {
  let vocabList;
  switch (action.type) {
    case INIT_STORY:
      return({
        ...state,
        storyTitle: action.payload.story,
        storyTextKorn: action.payload.storyTextKorn,
        storyTextEngl: action.payload.storyTextEngl
      })
    case GET_VOCAB_AND_GRAMMAR_SUCCESS:
      return {
        ...state,
        vocab: action.payload.vocab,
        grammar: action.payload.grammar,
      };
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
    case ADD_SAVED_WORD:
      vocabList = state.vocabList;
      vocabList.vocabList.push(action.payload.order_id)
      return{
        ...state,
        vocabList,
        openStatus: true,
        statusMessage: "Added Vocab"
      }
    case DELETE_SAVED_WORD:
      vocabList = state.vocabList;
      vocabList.vocabList.splice(vocabList.vocabList.indexOf(action.payload.order_id),1)
      return{
        ...state,
        vocabList,
        openStatus: true,
        statusMessage: "Deleted Vocab"
      }
    case LEAVE_STORY:
      return initialState
    case RESET_STATUS:
      return {
        ...state,
        openStatus: false,
        statusMessage: ""
      }

    default:
      return state;
  }
}