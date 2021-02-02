import {
    GET_SAVED_WORDS,
    TOGGLE_SIDEBAR, UPDATE_DRAWER_SIZE, TOGGLE_SIDEBAR_BUTTON, GET_LIST_OF_SAVED_GRAMMARS, ADD_SAVED_GRAMMAR,
    ENABLE_SIDEBAR_BUTTON, RESET_SIDEBAR, ADD_SAVED_WORD, DELETE_SAVED_WORD, GET_LIST_OF_SAVED_WORDS, DELETE_SAVED_GRAMMAR
} from '../../constants/410-action-types';

const initialState = {
    savedVocabIds: [],
    savedGrammarIds: [],
    drawerSize: {width: "0vw", height: "100vh"},
    isSideBarOpen: false,
    isButtonDisabled: true
};

export default (state = initialState, action) => {
    let savedWords, savedVocabIds, index, savedGrammarIds;
    switch (action.type) {
        case GET_SAVED_WORDS:
            return{
                ...state,
                savedWords: action.payload
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
        case GET_LIST_OF_SAVED_WORDS:
            return {
                ...state,
                savedVocabIds: action.payload
            }
        case GET_LIST_OF_SAVED_GRAMMARS:
            return {
                ...state,
                savedGrammarIds: action.payload
            }
        case ADD_SAVED_WORD:
            savedVocabIds = state.savedVocabIds;
            savedWords = state.savedWords;
            savedVocabIds.push(action.payload._id);
            savedWords.push(action.payload)
            return{
                ...state,
                savedVocabIds: savedVocabIds,
                savedWords: savedWords
            }
        case ADD_SAVED_GRAMMAR:
            savedGrammarIds = state.savedGrammarIds;
            savedGrammarIds.push(action.payload._id);
            return{
                ...state,
                savedGrammarIds
            }
        case DELETE_SAVED_WORD:
            savedVocabIds = state.savedVocabIds
            savedWords = state.savedWords;
            index = savedWords.indexOf(action.payload);
            let indexId = savedVocabIds.indexOf(action.payload._id)
            if(index > -1){
                savedWords.splice(index,1)
            }
            if(indexId > -1) {
                savedVocabIds.splice(indexId,1);
            }
            return{
                ...state,
                savedWords: savedWords,
                savedVocabIds: savedVocabIds
            }
        case DELETE_SAVED_GRAMMAR:
            // savedGrammarIds = state.savedGrammarIds
            // index = savedGrammarIds.indexOf(action.payload)
            // if(index > -1) {
            //     savedGrammarIds.splice(index,1);
            // }
            return{
                ...state,
                savedGrammarIds: action.payload
            }
        default:
            return state;
    }
}