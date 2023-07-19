import { createAction } from "../../utils/reducer.utils";
import { userActionTypes } from "./user.types";

export const setCurrentUser = (user) => createAction(userActionTypes.setCurrentUser, user);
//                                                               Type               Payload