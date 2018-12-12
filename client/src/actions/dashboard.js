

import axios from "axios";
import {GET_DASHBOARD_SUCCESS, UPDATE_DRAWER_SIZE} from "../constants/action-types";


export const dashboardInit = () => dispatch => {
  const params = {
    responseType: 'application/json',
    classType: 'all'
  }
  const initPromises = [];
  initPromises.push(axios.get("/api/dashboard/", {params}).then(res=>{
    console.log(res.data);
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

