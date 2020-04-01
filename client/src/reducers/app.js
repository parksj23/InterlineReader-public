import {GET_STORY_LIST} from '../constants/action-types';

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
    default:
      return state;
  }
}
