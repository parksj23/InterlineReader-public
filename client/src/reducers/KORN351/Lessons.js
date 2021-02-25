import {
    GET_MAIN_TEXT_AND_EX_SENTENCES,
    GET_NEW_VOCABULARY,
    GET_NEW_HANJA_COMBOS,
    GET_ABOUT_NEW_BUSU,
    GET_PRAC_SENTENCES
} from '../../constants/351-action-types';

const initialState = {
    mainText: '',
    subText: '',
    currentLesson: 1,
    exampleSentences: [],
    newVocabulary: '',
    newHanjaCombos: [],
    aboutNewBusu: [],
    pracSentences: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN_TEXT_AND_EX_SENTENCES:
            if (action.payload !== undefined)
                return({
                    ...state,
                    mainText: action.payload.text,
                    currentLesson: action.payload.lesson,
                    subText: action.payload.others,
                    exampleSentences: action.payload.exampleSentences
                });
        case GET_NEW_VOCABULARY:
            if (action.payload !== undefined)
                return({
                    ...state,
                    newVocabulary: action.payload
                });
        case GET_NEW_HANJA_COMBOS:
            if (action.payload !== undefined)
                return({
                    ...state,
                    newHanjaCombos: action.payload
                });
        case GET_ABOUT_NEW_BUSU:
            if (action.payload !== undefined)
                return({
                    ...state,
                    aboutNewBusu: action.payload
                });
        case GET_PRAC_SENTENCES:
            if (action.payload !== undefined)
                return({
                    ...state,
                    pracSentences: action.payload
                });
        default:
            return state;
    }
}
