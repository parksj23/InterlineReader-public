import {USER_LOGIN, USER_LOGOUT, USER_SIGNOUT, USER_SIGNUP} from "../service/types";

// USAGE: to handle user authentication and signup

//TODO: Implement reducers
const defaultState = {}
export default function authenticate(state = defaultState, action) {
    switch (action.type) {
        case USER_LOGIN: {
            return null
        }

        case USER_LOGOUT: {
            return null
        }

        case USER_SIGNUP: {
            return null
        }
        case USER_SIGNOUT: {
            return null
        }

        default:
            return state;

    }
}