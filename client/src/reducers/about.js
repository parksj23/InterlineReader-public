import {GET_LOGO_SUCCESS} from "../constants/action-types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LOGO_SUCCESS:
      return {
        ...state,
        logo: action.logo
      }
    default:
      return state;

  }
}