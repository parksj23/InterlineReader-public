

import axios from "axios";
import {GET_DASHBOARD_ASSET, GET_DASHBOARD_SUCCESS, UPDATE_DRAWER_SIZE} from "../constants/action-types";


export const dashboardInit = () => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  const assetParams = {
    folder: '/korn/'
  }
  const initPromises = [];
 /* initPromises.push(axios.get("/api/dashboard", {params}).then((res) => {
    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: res.data
    })


  }))*/
  initPromises.push(axios.get("/api/dashboard/assetNames", {params}).then(res=>{
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

