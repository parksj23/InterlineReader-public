import axios from "axios";
import {GET_LOGO_SUCCESS} from "../constants/action-types";



export const fetchLogo = () => dispatch => {
  axios.get("/api/about/getLogo", {responseType: "text"}).then((res) => {
    dispatch({
      type: GET_LOGO_SUCCESS,
      logo: res.data
    })


  })

}

