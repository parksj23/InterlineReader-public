import axios from "axios";
import {
    GET_CHARACTERS,
    GET_NEW_BUSU,
    GET_RADICALS,
    GET_PHONETICS,
    GET_EUM_FILTERS
} from "../../constants/351-action-types";

export const getCharacters = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/okpyeon/getCharacters").then(resp => {
            dispatch({
                type: GET_CHARACTERS,
                payload: resp.data
            });
            resolve()
        })
    })
};

export const getRadicals = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/okpyeon/getRadicals").then(resp => {
            dispatch({
                type: GET_RADICALS,
                payload: resp.data
            });
            resolve();
        })
    })
};

export const getNewBusu = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/okpyeon/getNewBusu").then(resp => {
            dispatch({
                type: GET_NEW_BUSU,
                payload: resp.data
            });
            resolve();
        })
    })
};

export const getPhonetics = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/okpyeon/getPhonetics").then(resp => {
            dispatch({
                type: GET_PHONETICS,
                payload: resp.data
            });
            resolve();
        })
    })
};

export const getEumFilters = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get("/api/okpyeon/getEumFilters").then(resp => {
            dispatch({
                type: GET_EUM_FILTERS,
                payload: resp.data[0].eumFilter
            });
            resolve();
        })
    })
}

