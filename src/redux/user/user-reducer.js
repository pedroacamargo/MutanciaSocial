import { userActionTypes } from './user.types'

const INITIAL_STATE = {
    currentUser: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { 
        type,
        payload,
    } = action;

    switch(type) {
        case userActionTypes.setCurrentUser:
            return {
                ...state,
                currentUser: payload,
            }
        default:
            return state;
    }


}


/* 
currentUser: {
    displayName: string,
    email: string,
    uid: string,
}
*/