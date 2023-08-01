import { databases } from "@/lib/types/databases.types";
import { SaveInDatabaseProps } from "@/lib/interfaces/SaveDataProps.interface";
import { auth, googleProvider, db } from "@/utils/firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

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
 * @returns User | null
 * 
 */
export async function statePersist() {
    const isLogged = await isLoggedIn();
    const currentUser = auth.currentUser;

    if (isLogged) return currentUser;
    return null;
}


/**
 * Will signUp or signIn an user with Google Provider automatically, testing if already exists in the DB
 * @returns User | null
 */
export async function continueWithGoogle() {
    try {
        const user = await signInWithPopup(auth, googleProvider);
        const userData = { displayName: user?.user.displayName, email: user?.user.email, uid: user?.user.uid }

        if (user.user.email) {
            const alreadyExist = await isInAuthDB(user.user.email);
            if (!alreadyExist) {
                SaveInDatabase({
                    dbName: databases.authDB,
                    payload: userData,
                })
            } else console.log('User already exists in our db, redirecting to home page...')
        }
        
        window.localStorage.clear();
        window.localStorage.setItem('currentUser', JSON.stringify(userData));
        return user
    } catch (err) {
        console.error(`An error ocurred: ${err}`);
        return null;
    }
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

    console.log('adding user in the db...')
    await addDoc(dbRef, {...props.payload, modifiedAt});
}

/**
 * @async - This function tests if there's a given email currently in the database
 * @param email - Email to be tested if it's present in the database
 * @return Boolean
 */
export const isInAuthDB = async (email: string) => {
    const dbRef = collection(db, databases.authDB);
    const data = await getDocs(dbRef);
    const repeatedUser = data.docs.some((doc) => {
        if (doc.data().email != email) return false;
        return true;
    });
    
    return repeatedUser;
}