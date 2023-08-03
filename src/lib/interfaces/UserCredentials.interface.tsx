import { Auth, User } from "firebase/auth";

export interface UserCredentials {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface UserCookies {
    user: User,
    acceptedConditions: boolean,
}