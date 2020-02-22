import {GET_STORY_LIST} from '../constants/action-types';

const initialState = {
  storyList: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORY_LIST:
      return {
        ...state,
        storyList: action.payload,
      };
    default:
      return state;
  }
}
