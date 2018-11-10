import {CHANGE_INSTRUCTOR_SELECTED_MENU} from "../constants/action-types";

const initialState = {
  selectedMenu: "Analytics"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INSTRUCTOR_SELECTED_MENU:
      return{
        ...state,
        selectedMenu: action.payload
      }
    default:
      return state;
  }
}