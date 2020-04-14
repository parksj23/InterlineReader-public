import {
  GET_DASHBOARD_SUCCESS,
  DASHBOARD_IS_LOADING,
  DASHBOARD_IS_NOT_LOADING,
  DASHBOARD_GET_MIDKR,
  DASHBOARD_GET_MODKR
} from '../constants/action-types';

const initialState = {
  isDashboardLoading: false,
  midKr: {
    midKrGram: null,
    midKrVoc: null
  }
  ,
  modKr: {
    modKrGram: [],
    modKrVoc: []
  }
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
        isDashboardLoading: true
      }
    case DASHBOARD_IS_NOT_LOADING:
      return {
        ...state,
        isDashboardLoading: false
      }
    case DASHBOARD_GET_MIDKR:
      return {
        ...state,
        midKr: action.payload
      }
    case DASHBOARD_GET_MODKR:
      return {
        ...state,
        modKr: action.payload
      }
    default:
      return state;
  }
}
