import axios from "axios";
import {
    GET_MAIN_TEXT_AND_EX_SENTENCES,
    GET_NEW_VOCABULARY,
    GET_NEW_HANJA_COMBOS,
    GET_ABOUT_NEW_BUSU,
    GET_PRAC_SENTENCES
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
            dispatch({
                type: GET_NEW_VOCABULARY,
                payload: resp.data[0]
            });
            resolve()
        })
    })
};

export const getNewHanjaCombos = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/lesson/getNewHanjaCombos").then(resp => {
            dispatch({
                type: GET_NEW_HANJA_COMBOS,
                payload: resp.data
            });
            resolve()
        })
    })
};

export const getAboutNewBusu = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/lesson/getAboutNewBusu").then(resp => {
            dispatch({
                type: GET_ABOUT_NEW_BUSU,
                payload: resp.data
            });
            resolve()
        })
    })
};

export const getPracticeSentences = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/lesson/getPracSentences").then(resp => {
            dispatch({
                type: GET_PRAC_SENTENCES,
                payload: resp.data
            });
            resolve()
        })
    })
};
