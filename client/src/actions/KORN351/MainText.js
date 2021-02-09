import axios from "axios";
import {
    GET_MAIN_TEXT_AND_EX_SENTENCES,
    GET_NEW_VOCABULARY
} from "../../constants/351-action-types";

export const getMainText = lesson => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/lesson/getMainText", {params: {lesson: lesson}}).then(resp => {
            dispatch({
                type: GET_MAIN_TEXT_AND_EX_SENTENCES,
                payload: resp.data[0]
            });
            resolve()
        })
    })
};

export const getNewVocabulary = lesson => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/lesson/getNewVocab", {params: {lesson: lesson}}).then(resp => {
            console.log(resp.data)
            dispatch({
                type: GET_NEW_VOCABULARY,
                payload: resp.data[0]
            });
            resolve()
        })
    })
};
