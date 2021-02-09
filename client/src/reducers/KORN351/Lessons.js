import {
    GET_MAIN_TEXT_AND_EX_SENTENCES,
    GET_NEW_VOCABULARY
} from '../../constants/351-action-types';

const initialState = {
    mainText: '',
    subText: '',
    currentLesson: 1,
    exampleSentences: [],
    newVocabulary: ''
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
        default:
            return state;
    }
}
