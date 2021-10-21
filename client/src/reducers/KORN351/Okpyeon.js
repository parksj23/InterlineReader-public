import {
    GET_CHARACTERS,
    GET_RADICALS,
    GET_PHONETICS,
    GET_EUM_FILTERS,
    GET_NEW_BUSU
} from '../../constants/351-action-types';

const initialState = {
    characters: [],
    radicals: [],
    phonetics: [],
    newBusu: [],
    eumFilters: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return({
                ...state,
                characters: action.payload
            });
        case GET_RADICALS:
            return {
                ...state,
                radicals: action.payload
            };
        case GET_NEW_BUSU:
            return {
                ...state,
                newBusu: action.payload
            };
        case GET_PHONETICS:
            return {
                ...state,
                phonetics: action.payload
            };
        case GET_EUM_FILTERS:
            return {
                ...state,
                eumFilters: action.payload
            };
        default:
            return state;
    }
}
