

import axios from "axios";
import {GET_DASHBOARD_SUCCESS, UPDATE_DRAWER_SIZE, TOGGLE_SIDEBAR_BUTTON} from "../constants/action-types";


export const dashboardInit = () => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  const initPromises = [];
  initPromises.push(axios.get("/api/dashboard/", {params}).then(res=>{
    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: res.data
    })
  }))



}

export const updateDrawerSize = (size) => dispatch => {
  dispatch({
    type: UPDATE_DRAWER_SIZE,
    payload: size
  })
}

export const toggleSideBarButton = disabled => dispatch =>{
  dispatch({
    tyoe: TOGGLE_SIDEBAR_BUTTON,
    payload: !disabled
  })
}

export const disableSideBarButton = () => dispatch => {
  dispatch({
    type: TOGGLE_SIDEBAR_BUTTON,
    payload: true
  })
}

