import {GET_DASHBOARD_ASSET, GET_DASHBOARD_SUCCESS} from '../constants/action-types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        badges: action.payload,
      };
    case GET_DASHBOARD_ASSET:
    default:
      return state;
  }
}
