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
  INSTRUCTOR_ADD_NEW_GRAMMAR,
  INSTRUCTOR_RESET_EDIT_VOCAB,
  INSTRUCTOR_RESET_EDIT_GRAMMAR,
  INSTRUCTOR_DELETE_VOCAB,
  INSTRUCTOR_DELETE_GRAMMAR,
  INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR,
  INSTRUCTOR_CANCEL_SELECTION,
  INSTRUCTOR_GET_MIDDLE_KR_GRAM,
  INSTRUCTOR_ADD_MIDKR_GRAMMAR,
  INSTRUCTOR_CLOSE_ADDMIDKRGRAM_STATUS,
  INSTRUCTOR_SAVE_MIDKR_GRAM,
  INTRUCTOR_UPDATE_MIDKR_GRAMMAR,
  INSTRUCTOR_DELETE_MIDKR_GRAMMAR,
  INSTRUCTOR_ADD_MIDKR_VOCAB,
  INTRUCTOR_UPDATE_MIDKR_VOCAB,
  INSTRUCTOR_SAVE_MIDKR_VOCAB,
  INSTRUCTOR_DELETE_MIDKR_VOCAB,
  INSTRUCTOR_GET_MIDKR_VOCAB,
  INSTRUCTOR_GET_CLASSES,
  INSTRUCTOR_NEW_CLASS,
  INSTRUCTOR_UPDATE_CLASS,
  INSTRUCTOR_GET_FILES,
  INSTRUCTOR_ADD_FILE
} from "../constants/action-types";

const initialState = {
  selectedMenu: "Analytics",
  addNewStory: false,
  headerName: "Instructor's Dashboard",
  editVocab: {
    selectedVocab: null,
    userHighlightedText: null,
    highlightTextUpdating: false,
    editVocabUpdating: false,
    editVocabStatus: null,
    editVocabStatusMessage: null

  },
  editGrammar: {
    selectedGrammar: null,
    userHighlightedText: null,
    highlightTextUpdating: false,
    editGrammarUpdating: false,
    ediGrammarStatusMessage: null,
    editGrammarStatus: null
  },
  addMiddleGram: {
    grammarList: [],
    addNewGrammarMessage: null,
  },
  addMiddleVocab: {
    vocabList:[],
    addNewVocabStatusMessage: null,

  },
  classes: [],
  files: []
};

export default (state = initialState, action) => {
  let newVocabList;
  let newGrammarList;
  let classes;
  switch (action.type) {
    case INSTRUCTOR_INIT:
      return {
        ...state,
        storyList: action.payload
      };
    case INIT_EDIT_VOCAB:
      return {
        ...state,
        editVocab: action.payload
      };
    case INIT_EDIT_GRAMMAR:
      return {
        ...state,
        editGrammar: action.payload
      };
    case CHANGE_INSTRUCTOR_SELECTED_MENU:
      return {
        ...state,
        headerName: action.payload.headerName
      };
    case ADD_NEW_STORY:
      return {
        ...state,
        addNewStory: action.payload.status,
        addNewStoryMessage: action.payload.message
      };
    case GET_STORY_LIST:
      return {
        ...state,
        storyList: action.payload
      };
    case CLOSE_STATUS_BAR:
      let newAddMiddleGram = state.addMiddleGram
      let newAddMiddleVocab = state.addMiddleVocab
      let newEditVocab = state.editVocab
      let newEditGrammar = state.editGrammar
      newAddMiddleGram.addNewGrammarMessage = null
      newAddMiddleVocab.addNewVocabStatusMessage = null
      newEditGrammar.ediGrammarStatusMessage = null
      newEditVocab.editVocabStatusMessage = null
      return {
        ...state,
        addNewStory: false,
        addMiddleGram: newAddMiddleGram,
        addMiddleVocab: newAddMiddleVocab,
        editVocab: newEditVocab,
        editGrammar: newEditGrammar,
        message: ""
      };
    case ANALYTICS_INIT_OVERVIEW:
      let allAnalytics = [];
      action.payload.forEach(function(anAnalytic) {
        let analytic = anAnalytic.data;
        analytic = analytic.map(anEntry => {
          if (anEntry.date) {
            let legibleDate = new Date(anEntry.date);
            return {
              ...anEntry,
              name: `${legibleDate.getMonth() + 1}/${legibleDate.getDate()}`
            };
          } else {
            return {
              ...anEntry
            };
          }
        });
        allAnalytics.push({ type: anAnalytic.type, data: analytic });
      });
      return {
        ...state,
        analytics: allAnalytics
      };
    case INSTRUCTOR_GET_VOCAB:
      return {
        ...state,
        vocabList: action.payload
      };
    case INSTRUCTOR_GET_GRAMMAR:
      return {
        ...state,
        grammarList: action.payload
      };
    case INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB:
      newEditVocab = state.editVocab;
      newEditVocab.selectedVocab = action.payload;
      newEditVocab.userHighlightedText = null;
      return {
        ...state,
        editVocab: newEditVocab
      };
    case INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR:
      newEditGrammar = state.editGrammar;
      newEditGrammar.selectedGrammar = action.payload;
      newEditGrammar.userHighlightedText = null;
      return {
        ...state,
        editGrammar: newEditGrammar
      };
    case INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT:
      let userHighlightedText = action.payload.text;

      if (action.payload.component === "Vocab") {
        newEditVocab = state.editVocab;
        newEditVocab.userHighlightedText = userHighlightedText;
        newEditVocab.selectedVocab = null;
        newEditVocab.highlightTextUpdating = false;
        return {
          ...state,
          editVocab: newEditVocab
        };
      } else {
        newEditGrammar = state.editGrammar;
        newEditGrammar.userHighlightedText = userHighlightedText;
        newEditGrammar.selectedGrammar = null;
        newEditGrammar.highlightTextUpdating = false;
        return {
          ...state,
          editGrammar: newEditGrammar
        };
      }
    case INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB:
      let editVocabClear = state.editVocab;
      editVocabClear.selectedVocab = action.payload;
      return {
        ...state,
        editVocab: editVocabClear
      };
    case INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT:
      if (action.payload === "Vocab") {
        newEditVocab = state.editVocab;
        newEditVocab.highlightTextUpdating = true;
        return {
          ...state,
          editVocab: newEditVocab
        };
      } else {
        newEditGrammar = state.editGrammar;
        newEditGrammar.highlightTextUpdating = true;
        return {
          ...state,
          editGrammar: newEditGrammar
        };
      }
    case INSTRUCTOR_UPDATE_VOCAB:
      newEditVocab = state.editVocab;
      newVocabList = state.editVocab.MODKR.vocabList;
      newVocabList.splice(action.payload.vocab.order_id - 1, 1, action.payload.vocab);
      newEditVocab.vocabList = newVocabList;
      newEditVocab.selectedVocab = action.payload.vocab;
      newEditVocab.MODKR.vocabSearch[action.payload.vocab.korean] = action.payload.vocab;
      newEditVocab.editVocabUpdating = false;
      return {
        ...state,
        editVocab: {
          ...newEditVocab,
          editVocabStatusMessage: action.payload.message
        }
      };
    case INSTRUCTOR_UPDATE_GRAMMAR:
      newEditGrammar = state.editGrammar;
      newGrammarList = state.editGrammar.MODKR.grammarList;
      newGrammarList.splice(action.payload.grammar.order_id - 1, 1, action.payload.grammar);
      newEditGrammar.MODKR.grammarList = newGrammarList;
      newEditGrammar.selectedGrammar = action.payload.grammar;
      newEditGrammar.MODKR.grammarSearch[action.payload.grammar.sentence] =
        action.payload.grammar;
      newEditGrammar.editGrammarUpdating = false;
      return {
        ...state,
        editGrammar: {
          ...newEditGrammar,
          ediGrammarStatusMessage: action.payload.message
        }
      };
    case INSTRUCTOR_START_UPDATING_EDIT_VOCAB:
      newEditVocab = state.editVocab;
      newEditVocab.editVocabUpdating = true;
      return {
        ...state,
        editVocab: newEditVocab
      };
    case INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR:
      newEditGrammar = state.editGrammar;
      newEditGrammar.editGrammarUpdating = true;
      return {
        ...state,
        editGrammar: newEditGrammar
      };
    case INSTRUCTOR_SAVE_VOCAB:
      return {
        ...initialState
      };
    case INSTRUCTOR_ADD_NEW_VOCAB:
      newEditVocab = state.editVocab;
      newVocabList = state.editVocab.MODKR.vocabList;
      newVocabList.forEach(function(aVocab) {
        if (aVocab >= action.payload.order_id) {
          aVocab.order_id++;
        }
      });
      newVocabList.splice(action.payload.order_id - 1, 0, action.payload);
      newEditVocab.MODKR.vocabList = newVocabList;
      newEditVocab.MODKR.vocabSearch[action.payload.korean] = action.payload;
      newEditVocab.highlightTextUpdating = false;
      return {
        ...state,
        editVocab: newEditVocab
      };
    case INSTRUCTOR_ADD_NEW_GRAMMAR:
      newEditGrammar = state.editGrammar;
      newGrammarList = state.editGrammar.MODKR.grammarList;
      newGrammarList.forEach(function(aGrammar) {
        if (aGrammar >= action.payload.order_id) {
          aGrammar.order_id++;
        }
      });
      newGrammarList.splice(action.payload.order_id - 1, 0, action.payload);
      newEditGrammar.MODKR.grammarList = newGrammarList;
      newEditGrammar.MODKR.grammarSearch[action.payload.sentence] =
        action.payload;
      newEditGrammar.highlightTextUpdating = false;
      return {
        ...state,
        editGrammar: newEditGrammar
      };
    case INSTRUCTOR_RESET_EDIT_VOCAB:
      return {
        ...state,
        editVocab: initialState.editVocab
      };
    case INSTRUCTOR_RESET_EDIT_GRAMMAR:
      return {
        ...state,
        editGrammar: initialState.editGrammar
      };
    case INSTRUCTOR_DELETE_VOCAB:
      newEditVocab = state.editVocab;
      newVocabList = state.editVocab.MODKR.vocabList;
      newVocabList.forEach(function(aVocab) {
        if (aVocab >= action.payload.order_id) {
          aVocab.order_id--;
        }
      });
      newVocabList.splice(newVocabList.indexOf(action.payload), 1);

      newEditVocab.MODKR.vocabList = newVocabList;
      newEditVocab.editVocabUpdating = false;
      newEditVocab.selectedVocab = null;
      delete newEditVocab.MODKR.vocabSearch[action.payload.korean];
      return {
        ...state,
        editVocab: newEditVocab
      };
    case INSTRUCTOR_DELETE_GRAMMAR:
      newEditGrammar = state.editGrammar;
      newGrammarList = state.editGrammar.MODKR.grammarList;
      newGrammarList.forEach(function(aGrammar) {
        if (aGrammar >= action.payload.order_id) {
          aGrammar.order_id--;
        }
      });
      newGrammarList.splice(newGrammarList.indexOf(action.payload), 1);

      newEditGrammar.MODKR.grammarList = newGrammarList;
      newEditGrammar.editGrammarUpdating = false;
      newEditGrammar.selectedGrammar = null;
      delete newEditGrammar.MODKR.grammarSearch[action.payload.sentence];
      return {
        ...state,
        editGrammar: newEditGrammar
      };
    case INSTRUCTOR_CANCEL_SELECTION:
      newEditVocab = state.editVocab;
      newEditGrammar = state.editGrammar;

      newEditVocab.userHighlightedText = null;
      newEditGrammar.userHighlightedText = null;

      return {
        ...state,
        editVocab: newEditVocab,
        editGrammar: newEditGrammar
      };
    case INSTRUCTOR_GET_MIDDLE_KR_GRAM:
      newAddMiddleGram = state.addMiddleGram;
      newAddMiddleGram.grammarList = action.payload;
      return {
        ...state,
        addMiddleGram: newAddMiddleGram
      };
    case INSTRUCTOR_ADD_MIDKR_GRAMMAR:
      newAddMiddleGram = state.addMiddleGram
      newAddMiddleGram.grammarList.push(action.payload.grammar)
      newAddMiddleGram.addNewGrammarMessage = action.payload.status
      return {
        ...state,
        addMiddleGram: newAddMiddleGram
      }
    case INSTRUCTOR_SAVE_MIDKR_GRAM:
    case INTRUCTOR_UPDATE_MIDKR_GRAMMAR:
    case INSTRUCTOR_DELETE_MIDKR_GRAMMAR:
      newAddMiddleGram = state.addMiddleGram;
      newAddMiddleGram.grammarList = action.payload;
      return {
        ...state,
        addMiddleGram: newAddMiddleGram
      }
    case INSTRUCTOR_CLOSE_ADDMIDKRGRAM_STATUS:
      newAddMiddleGram = state.addMiddleGram;
      newAddMiddleGram.addNewGrammarMessage = null
        return {
          ...state,
          addMiddleGram: newAddMiddleGram
        }
    case INSTRUCTOR_GET_MIDKR_VOCAB:
      newAddMiddleVocab = state.addMiddleVocab;
      newAddMiddleVocab.vocabList = action.payload;
      return {
        ...state,
        addMiddleVocab: newAddMiddleVocab
      };
    case INSTRUCTOR_ADD_MIDKR_VOCAB:
      newAddMiddleVocab = state.addMiddleVocab
      newAddMiddleVocab.vocabList.push(action.payload.vocab)
      newAddMiddleVocab.addNewVocabStatusMessage = action.payload.status
      return{
        ...state,
        addMiddleVocab: newAddMiddleVocab
      }
    case INSTRUCTOR_SAVE_MIDKR_VOCAB:
    case INTRUCTOR_UPDATE_MIDKR_VOCAB:
    case INSTRUCTOR_DELETE_MIDKR_VOCAB:
      newAddMiddleVocab = state.addMiddleVocab;
      newAddMiddleVocab.vocabList = action.payload;
      return {
        ...state,
        addMiddleVocab: newAddMiddleVocab
      }
    case INSTRUCTOR_GET_CLASSES:
      return {
        ...state,
        classes: action.payload
      }
    case INSTRUCTOR_NEW_CLASS:
      classes = state.classes
      classes.push(action.payload)
      return {
        ...state,
        classes
      }
    case INSTRUCTOR_UPDATE_CLASS:
      classes = state.classes;
      for(let i = 0; i < classes.length; i++){
        if(classes[i]._id === action.payload._id) {
          classes.splice(i,1, action.payload)
          break;
        }
      }
      return {
        ...state,
        classes
      }
    case INSTRUCTOR_GET_FILES:
      return {
        ...state,
        files: action.payload
      }
    case INSTRUCTOR_ADD_FILE:
      let newFiles = state.files
      newFiles.push(action.payload)
      return{
        ...state,
        files: newFiles
      }
    default:
      return state;
  }
};
