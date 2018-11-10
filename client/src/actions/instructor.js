import {CHANGE_INSTRUCTOR_SELECTED_MENU, INSTRUCTOR_INIT} from '../constants/action-types';


/*export const instructorInit = dispatch => {
  dispatch({
    type: INSTRUCTOR_INIT,
    payload: null
  })

}*/

export const changeSelectedMenu =(newMenu) => dispatch => {
  dispatch({
    type: CHANGE_INSTRUCTOR_SELECTED_MENU,
    payload: newMenu
  })
}

