

import axios from "axios";
import {GET_VOCAB_AND_GRAMMAR_SUCCESS, TOGGLE_SIDEBAR} from "../constants/action-types";


export const addVocabToSavedWords = (vocab) => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }

}

export const toggleSideBar = (isOpened) => dispatch => {

  dispatch({
    type: TOGGLE_SIDEBAR,
    payload: isOpened
  })


}

