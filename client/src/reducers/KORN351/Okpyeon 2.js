import {
    GET_CHARACTERS,
    GET_RADICALS,
    GET_PHONETICS,
    GET_EUM_FILTERS
} from '../../KORN351/constants/action-types';

const initialState = {
    characters: [],
    radicals: [],
    phonetics: [],
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
