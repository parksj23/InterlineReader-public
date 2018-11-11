import {CHANGE_INSTRUCTOR_SELECTED_MENU,ADD_NEW_STORY} from "../constants/action-types";

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
    case ADD_NEW_STORY:
      return{
        ...state
      }
    default:
      return state;
  }
}