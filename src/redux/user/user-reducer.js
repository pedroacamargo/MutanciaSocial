import { userActionTypes } from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    isLoading: true,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const { 
        type,
        payload,
    } = action;

    switch(type) {
        case userActionTypes.FETCH_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case userActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
            }
        case userActionTypes.FETCH_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload,
            }
        case userActionTypes.FETCH_USER_FINISHED:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}