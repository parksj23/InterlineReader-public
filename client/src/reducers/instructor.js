import {CHANGE_INSTRUCTOR_SELECTED_MENU,ADD_NEW_STORY,GET_STORY_LIST,CLOSE_STATUS_BAR, ANALYTICS_INIT_OVERVIEW} from "../constants/action-types";

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
    case ANALYTICS_INIT_OVERVIEW:
      let allAnalytics = []
      action.payload.map(anAnalytic => {
        let analytic = anAnalytic.data
        console.log(anAnalytic)
        analytic = analytic.map(anEntry => {
          if(anEntry.date){
            let legibleDate = new Date(anEntry.date);
            return {
              ...anEntry,
              name: `${legibleDate.getMonth()+1}/${legibleDate.getDate()}`,
            }
          }else{
            return {
              ...anEntry,
            }
          }
        })
        allAnalytics.push({type: anAnalytic.type, data: analytic})
      })
      return{
        ...state,
        analytics: allAnalytics
      }
    default:
      return state;
  }
}