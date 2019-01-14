import {GET_DASHBOARD_SUCCESS,DASHBOARD_IS_LOADING, DASHBOARD_IS_NOT_LOADING} from '../constants/action-types';

const initialState = {
  isAuthenticated: false,
  user: {},
  isDashboardLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        storyList: action.payload,

      };
    case DASHBOARD_IS_LOADING:
      return {
        ...state,
        isDashboardLaoding: true
      }
    case DASHBOARD_IS_NOT_LOADING:
      return {
        ...state,
        isDashboardLoading: false
      }
    default:
      return state;
  }
}
