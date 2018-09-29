import {GET_VOCAB_REQUEST, GET_VOCAB_SUCCESS} from '../constants/action-types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VOCAB_SUCCESS:
      return {
        ...state,
        vocab: action.payload,
      };
    default:
      return state;
  }
}