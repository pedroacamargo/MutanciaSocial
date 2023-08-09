import { User } from "firebase/auth";

export interface UserCredentials {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface SignInCredentials {
    username: string,
    password: string,
}

export interface UserCookies {
    user: User,
    acceptedConditions: boolean,
}