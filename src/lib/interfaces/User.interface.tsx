export interface User {
    displayName: string,
    email: string,
    uid: string,
    modifiedAt?: Date,
    bio: string,
    age: number,
    gender: string,
    country: string,
    height: number,
    weight: number,
    sports: string[],
    acceptedConditions: boolean,
}