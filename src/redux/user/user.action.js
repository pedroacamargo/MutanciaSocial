import { createAction } from "../../utils/reducer.utils";
import { userActionTypes } from "./user.types";
import { statePersist } from "@/app/_components/auth/Auth.server";

export const setCurrentUser = (user) => createAction(userActionTypes.setCurrentUser, user);
//                                                               Type               Payload


export const fetchUserStart = () => createAction(userActionTypes.FETCH_USER_START);
export const fetchUserFinished = () => createAction(userActionTypes.FETCH_USER_FINISHED);
export const fetchUserFailed = (error) => createAction(userActionTypes.FETCH_USER_FAILED, error);
export const fetchUserSuccess = (user) => createAction(userActionTypes.FETCH_USER_SUCCESS, user);

export const fetchUserAsync = () => async (dispatch) => {
    dispatch(fetchUserStart());
    try {
        const user = await statePersist();
        console.log(user)
        dispatch(fetchUserSuccess(user));
    } catch (error) {
        dispatch(fetchUserFailed(error));
    }
}