import {
    GET_MAIN_TEXT_AND_EX_SENTENCES
} from '../../KORN351/constants/action-types';

const initialState = {
    mainText: '',
    subText: '',
    currentLesson: 1,
    exampleSentences: []
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
        default:
            return state;
    }
}
