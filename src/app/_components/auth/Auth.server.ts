import { auth, googleProvider } from "@/utils/firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

/**
 * 
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
 * Use this function with a dispatch(setCurrentUser(await statePersist())) in a useEffect to persist the data in Redux
 * @returns JSON.parse(window.localStorage.getItem("currentUser"))
 */
export async function statePersist() {
    const statePersistFunc = async () => {
        const isLogged = await isLoggedIn();
        const currentUserJson = window.localStorage.getItem("currentUser");

        if(isLogged && currentUserJson) {
            const user = JSON.parse(currentUserJson);
            return user;
        }
        return null;
    }
    return statePersistFunc();
}

export async function continueWithGoogle() {
    try {
        const user = await signInWithPopup(auth, googleProvider);
        return user
    } catch (err) {
        console.error(`An error ocurred: ${err}`);
        return null;
    }
}