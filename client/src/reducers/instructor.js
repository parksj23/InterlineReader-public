import {
  CHANGE_INSTRUCTOR_SELECTED_MENU,
  ADD_NEW_STORY,
  GET_STORY_LIST,
  CLOSE_STATUS_BAR,
  ANALYTICS_INIT_OVERVIEW,
  INSTRUCTOR_INIT,
  INSTRUCTOR_GET_VOCAB,
  INSTRUCTOR_GET_GRAMMAR,
  INIT_EDIT_VOCAB,
  INIT_EDIT_GRAMMAR,
  INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB,
  INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
  INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
  INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
  INSTRUCTOR_UPDATE_VOCAB,
  INSTRUCTOR_UPDATE_GRAMMAR,
  INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
  INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR,
  INSTRUCTOR_SAVE_VOCAB,
  INSTRUCTOR_ADD_NEW_VOCAB,
  INSTRUCTOR_RESET_EDIT_VOCAB,
  INSTRUCTOR_RESET_EDIT_GRAMMAR,
  INSTRUCTOR_DELETE_VOCAB, INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR
} from "../constants/action-types";

const initialState = {
  selectedMenu: "Analytics",
  addNewStory: false,
  headerName: "Instructor's Dashboard",
  editVocab: {
    selectedVocab: null,
    userHighlightedText: null,
    highlightTextUpdating: false,
    editVocabUpdating: false
  },
  editGrammar: {
    selectedGrammar: null,
    userHighlightedText: null,
    highlightTextUpdating: false,
    editGrammarUpdating: false
  }
}

export default (state = initialState, action) => {
  let newEditVocab;
  let newVocabList;
  let newEditGrammar;
  let newGrammarList;
  switch (action.type) {
    case INSTRUCTOR_INIT:
      return{
        ...state,
        storyList: action.payload
      }
    case INIT_EDIT_VOCAB:
      return {
        ...state,
        editVocab: action.payload
      }
    case INIT_EDIT_GRAMMAR:
      return {
        ...state,
        editGrammar: action.payload
      }
    case CHANGE_INSTRUCTOR_SELECTED_MENU:
      return{
        ...state,
        headerName: action.payload.headerName
      }
    case ADD_NEW_STORY:
      return{
        ...state,
        addNewStory: action.payload.status,
        addNewStoryMessage: action.payload.message
      }
    case GET_STORY_LIST:
      return {
        ...state,
        storyList: action.payload
      }
    case CLOSE_STATUS_BAR:
      return {
        ...state,
        addNewStory: false,
        message: ""
      }
    case ANALYTICS_INIT_OVERVIEW:
      let allAnalytics = []
      action.payload.map(anAnalytic => {
        let analytic = anAnalytic.data
        analytic = analytic.map(anEntry => {
          if(anEntry.date){
            let legibleDate = new Date(anEntry.date);
            return {
              ...anEntry,
              name: `${legibleDate.getMonth()+1}/${legibleDate.getDate()}`,
            }
          }else{
            return {
              ...anEntry,
            }
          }
        })
        allAnalytics.push({type: anAnalytic.type, data: analytic})
      })
      return{
        ...state,
        analytics: allAnalytics
      }
    case INSTRUCTOR_GET_VOCAB:
      return {
        ...state,
        vocabList: action.payload
      }
    case INSTRUCTOR_GET_GRAMMAR:
      return {
        ...state,
        grammarList: action.payload
      }
    case INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB:
      newEditVocab = state.editVocab
      newEditVocab.selectedVocab = action.payload
      newEditVocab.userHighlightedText = null
      return {
        ...state,
        editVocab: newEditVocab
      }
    case INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR:
      newEditGrammar = state.editGrammar
      newEditGrammar.selectedGrammar = action.payload
      newEditGrammar.userHighlightedText = null
      return {
        ...state,
        editGrammar: newEditGrammar
      }
    case INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT:
      let userHighlightedText = action.payload.text
      
      if(action.payload.component === "Vocab") {
        newEditVocab = state.editVocab
        newEditVocab.userHighlightedText = userHighlightedText
        newEditVocab.selectedVocab = null
        newEditVocab.highlightTextUpdating = false
        return {
          ...state,
          editVocab: newEditVocab
        }
      }
      else{
        newEditGrammar = state.editGrammar
        newEditGrammar.userHighlightedText = userHighlightedText
        newEditGrammar.selectedGrammar = null
        newEditGrammar.highlightTextUpdating = false
        return {
          ...state,
          editGrammar: newEditGrammar
        }
      }
    case INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB:
      let editVocabClear = state.editVocab
      editVocabClear.selectedVocab = action.payload
      return {
        ...state,
        editVocab: editVocabClear
      }
      return {
        ...state,

      }
    case INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT:
      if(action.payload === "Vocab"){
        newEditVocab = state.editVocab
        newEditVocab.highlightTextUpdating = true
        return {
          ...state,
          editVocab: newEditVocab
        }
      }
      else{
        newEditGrammar = state.editGrammar
        newEditGrammar.highlightTextUpdating = true
        return {
          ...state,
          editGrammar: newEditGrammar
        }
      }
    case INSTRUCTOR_UPDATE_VOCAB:
      newEditVocab = state.editVocab
      newVocabList = state.editVocab.vocabList;
      newVocabList.splice(action.payload.order_id-1,1,action.payload)
      newEditVocab.vocabList = newVocabList
      newEditVocab.selectedVocab = action.payload
      newEditVocab.vocabSearch[action.payload.korean] = action.payload
      newEditVocab.editVocabUpdating = false
      return{
        ...state,
        editVocab: newEditVocab
      }
    case INSTRUCTOR_UPDATE_GRAMMAR:
      newEditGrammar = state.editGrammar
      newGrammarList = state.editGrammar.grammarList;
      newGrammarList.splice(action.payload.order_id-1,1,action.payload)
      newEditGrammar.grammarList = newGrammarList
      newEditGrammar.selectedGrammar = action.payload
      newEditGrammar.grammarSearch[action.payload.sentence] = action.payload
      newEditGrammar.editGrammarUpdating = false
      return{
        ...state,
        editGrammar: newEditGrammar
      }
    case INSTRUCTOR_START_UPDATING_EDIT_VOCAB:
      newEditVocab = state.editVocab
      newEditVocab.editVocabUpdating = true
      return {
        ...state,
        editVocab: newEditVocab
      }
    case INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR:
      newEditGrammar = state.editGrammar
      newEditGrammar.editGrammarUpdating = true
      return {
        ...state,
        editGrammar: newEditGrammar
      }
    case INSTRUCTOR_SAVE_VOCAB:
      return{
        ...initialState
      }
    case INSTRUCTOR_ADD_NEW_VOCAB:
      newEditVocab = state.editVocab
      newVocabList = state.editVocab.vocabList
      newVocabList.map((aVocab, index) => {
        if(aVocab >= action.payload.order_id){
          aVocab.order_id++
        }
      })
      newVocabList.splice(action.payload.order_id-1,0,action.payload);
      newEditVocab.vocabList = newVocabList
      newEditVocab.vocabSearch[action.payload.korean] = action.payload;
      newEditVocab.highlightTextUpdating = false
      return {
        ...state,
        editVocab: newEditVocab
      }
    case INSTRUCTOR_RESET_EDIT_VOCAB:
      return{
        ...state,
        editVocab: initialState.editVocab
      }
    case INSTRUCTOR_RESET_EDIT_GRAMMAR:
      return {
        ...state,
        editGrammar: initialState.editGrammar
      }
    case INSTRUCTOR_DELETE_VOCAB:
      newEditVocab = state.editVocab
      newVocabList = state.editVocab.vocabList
      newVocabList.map((aVocab, index) => {
        if(aVocab >= action.payload.order_id){
          aVocab.order_id--
        }
      })
      newVocabList.splice(newVocabList.indexOf(action.payload),1);

      newEditVocab.vocabList = newVocabList
      newEditVocab.editVocabUpdating = false
      newEditVocab.selectedVocab = null
      delete newEditVocab.vocabSearch[action.payload.korean];
      return{
        ...state,
        editVocab: newEditVocab
      }

    default:
      return state;
  }
}