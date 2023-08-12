import { databases } from "@/lib/types/databases.types";
import { SaveInDatabaseProps } from "@/lib/interfaces/SaveDataProps.interface";
import { auth, googleProvider, db } from "@/utils/firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { User } from "@/lib/interfaces/User.interface";
import { UserCookies } from "@/lib/interfaces/UserCredentials.interface";
import { User as UserAuth } from "firebase/auth";

/**
 * Checks if there's a session live
 * @returns boolean: Returns true if there's an user logged in and false if not 
 */
export async function isLoggedIn() {
    return new Promise((resolve) => {        
        const unsubscribe = onAuthStateChanged(auth , (user) => {
            unsubscribe();
            
            resolve(!!user);
        })
    })
}

/**
 * Will check if an user is logged in, if is logged and there's an user stored in localStorage as "currentUser", will parse the JSON and return the user data.
 * @returns User as UserAuth | null
 */
export async function statePersist(): Promise<UserAuth | null> {
    const isLogged = await isLoggedIn();
    const currentUser = auth.currentUser;

    if (isLogged) return currentUser;
    return null;
}


/**
 * Will signUp or signIn an user with Google Provider automatically, testing if already exists in the DB
 * @returns User | null
 */
export async function continueWithGoogle(): Promise<UserCookies | null> {
    try {
        const user = await signInWithPopup(auth, googleProvider);

        if (user.user.email && user.user.displayName) {
            const alreadyExist = await isInAuthDB(user.user.email, user.user.displayName);
            if (!alreadyExist.emailRepeated && !alreadyExist.usernameRepeated) { 
                /** @TODO -> ERROR HANDLING WITH TRY/CATCH */
                SaveUserInDataBase({
                    acceptedConditions: false,
                    age: null,
                    bio: null,
                    country: null,
                    gender: null,
                    height: null,
                    sports: null,
                    weight: null,
                    headerName: null,
                    displayName: user.user.displayName,
                    uid: user.user.uid,
                    email: user.user.email,
                    followers: [],
                    followersAmount: 0,
                    following: [],
                    followingAmount: 0,
                    profilePictureURL: user.user.photoURL ? user.user.photoURL : '/Unknown_person.png',
                })
                return { user: user.user, acceptedConditions: false }
            } else {
                console.log('User already exists in our db, redirecting to home page...');
                const userData = await getUserFromAuthDBWithUid(user.user.uid);
                if (userData) {
                    return { user: user.user, acceptedConditions: userData.acceptedConditions }
                }
            } 
        }
        
    } catch (err) {
        console.error(`An error ocurred: ${err}`);
    }
    return null;
}


/**
 * @async Function to save any kind of data in any collection in firestore
 * 
 * @param props - Object to configure where and what you would like to save in firestore data base
 * @param props.dbName - String, it's the collection name in firestore
 * @param props.payload - Object containing all data you would like to save
 */
export const SaveInDatabase = async (props: SaveInDatabaseProps) => {
    const modifiedAt = new Date();
    const dbRef = collection(db, props.dbName);

    console.log('adding user in the db ', props.dbName);
    await setDoc(doc(dbRef, props.payload.uid), {...props.payload, modifiedAt});
}

/**
 * @async Function to save an user in authentication database 
 *  
 * @param user - An User that will be saved in the database 
 */
export const SaveUserInDataBase = async (user: User) => {
    const modifiedAt = new Date();
    const dbRef = collection(db, databases.authDB);

    console.log('adding user to authentication database...');
    await setDoc(doc(dbRef, user.uid), {...user, modifiedAt});
}

/**
 * @async - This function tests if there's a given email currently in the database
 * @param email - Email to be tested if it's present in the database
 * @return Boolean
 */
export const isInAuthDB = async (email: string, username: string): Promise<{ usernameRepeated: boolean, emailRepeated: boolean }> => {
    const dbRef = collection(db, databases.authDB);
    const data = await getDocs(dbRef);
    const repeatedEmail = data.docs.some((doc) => {
        if (doc.data().email != email) return false;
        return true;
    });
    
    const repeatedUsername = data.docs.some((doc) => {
        if (doc.data().displayName != username) return false;
        return true;
    });
    
    return { emailRepeated: repeatedEmail, usernameRepeated: repeatedUsername };
}

/**
 * @async - This function gives the user data located in the authentication database table giving the uid that you wish
 * @param uid - Auth.currentUser.uid
 * @returns User
 */
export const getUserFromAuthDBWithUid = async (uid: string): Promise<DocumentData | undefined> => {
    const dbRef = doc(db, databases.authDB, uid);
    const docSnap = await getDoc(dbRef);
    const data = docSnap.data();


    return data;
}


/**
 * @async - This function gives the user data located in the authentication database table giving the username that you wish
 * 
 * @param username - displayName or any string that you would like to give
 * @returns User | null
 */
export const getUserFromAuthDBWithUsername = async (username: string): Promise<User | null> => {
    const usersDBRef = collection(db, databases.authDB);
    const data = await getDocs(usersDBRef);

    const user: unknown = data.docs.find((doc) => {

        if (doc.data().displayName == username) {
            return doc;
        }

        return false;
    })?.data();

    if (user) return user as User;
    else return null
}