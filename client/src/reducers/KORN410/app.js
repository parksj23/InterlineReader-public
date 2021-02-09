import {ADD_STORY_INFO, GET_STORY_LIST} from '../../constants/410-action-types';

const initialState = {
  storyLists: {
    allStories: null,
    korn410StoryList: null,
    korn420StoryList: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORY_LIST:
      return {
        ...state,
        storyLists: action.payload,
      };
    case ADD_STORY_INFO:
      let updatedStoryList = state.storyLists
      updatedStoryList.allStories.push(action.payload)
      return {
        ...state,
        storyLists: updatedStoryList
      }
    default:
      return state;
  }
}
