import {CHANGE_INSTRUCTOR_SELECTED_MENU,ADD_NEW_STORY,GET_STORY_LIST,CLOSE_STATUS_BAR} from "../constants/action-types";

const initialState = {
  selectedMenu: "Analytics",
  addNewStory: false
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
        ...state,
        addNewStory: action.payload.status,
        addNewStoryMessage: action.payload.message

      }
    case GET_STORY_LIST:
      return {
        ...state,
        storyList: action.payload
      }
    case CLOSE_STATUS_BAR:
      return {
        ...state,
        addNewStory: false,
        message: ""
      }
    default:
      return state;
  }
}