export interface User {
    /* POSTS */
    posts: string[],
    comments: string[],
    
    /* Followers */
    followersAmount: number,
    followers: string[],
    followingAmount: number,
    following: string[]
    
    /* Profile */
    acceptedConditions: boolean,
    displayName?: string,
    modifiedAt?: Date,
    uid: string,
    email: string,
    profilePic: string,
    headerName: string | null,
    bio: string | null,
    age: number | null,
    gender: string | null,
    country: string | null,
    height: number | null,
    weight: number | null,
    sports: string[] | null,
}