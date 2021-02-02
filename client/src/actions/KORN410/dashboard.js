import axios from "axios";
import {
  GET_STORY_LIST,
  UPDATE_DRAWER_SIZE,
  TOGGLE_SIDEBAR_BUTTON,
  DASHBOARD_IS_LOADING, DASHBOARD_IS_NOT_LOADING,
  DASHBOARD_GET_MIDKR,
  DASHBOARD_GET_MODKR
} from "../../constants/410-action-types";

export const dashboardInit = () => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }

  return new Promise((resolve, reject) => {
    axios.get("/api/dashboard/", {params}).then(res => {
      dispatch({
        type: GET_STORY_LIST,
        payload: res.data
      })
      resolve(res.data)
    })
  })
}

export const updateDrawerSize = (size) => dispatch => {
  dispatch({
    type: UPDATE_DRAWER_SIZE,
    payload: size
  })
}

export const disableSideBarButton = () => dispatch => {
  dispatch({
    type: TOGGLE_SIDEBAR_BUTTON,
    payload: true
  })
}

export const enableDashboardLoading = () => dispatch => {
  dispatch({
    type: DASHBOARD_IS_LOADING,
    payload: null
  })
}

export const disableDashboardLoading = () => dispatch => {
  dispatch({
    type: DASHBOARD_IS_NOT_LOADING,
    payload: null
  })
}

export const getMiddleKorean = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get("/api/dashboard/middleKorean").then(resp => {
      dispatch({
        type: DASHBOARD_GET_MIDKR,
        payload: resp.data
      })
      resolve()
    })
  })
}

export const getModernKorean = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get("/api/dashboard/modernKorean").then(resp => {
      dispatch({
        type: DASHBOARD_GET_MODKR,
        payload: resp.data
      })
    })
  })
}
