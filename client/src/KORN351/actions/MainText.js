import axios from "axios";
import {
    GET_MAIN_TEXT_AND_EX_SENTENCES
} from "../constants/action-types";

export const getMainText = lesson => dispatch => {
    return new Promise((resolve, reject) => {
        console.log(parseInt(lesson) === 1)
        axios.get("/api/lesson/getMainText", {params: {lesson: lesson}}).then(resp => {
            dispatch({
                type: GET_MAIN_TEXT_AND_EX_SENTENCES,
                payload: resp.data[0]
            });
            resolve()
        })
    })
};

