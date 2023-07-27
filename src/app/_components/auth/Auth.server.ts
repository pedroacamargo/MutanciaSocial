import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export async function isLoggedIn() {
    return new Promise((resolve) => {        
        const unsubscribe = onAuthStateChanged(auth , (user) => {
            unsubscribe();
            
            resolve(!!user);
        })
    })
}


export async function statePersist() {
    const statePersistFunc = async () => {
        const isLogged = await isLoggedIn();
        const currentUserJson = window.localStorage.getItem("currentUser");

        if(isLogged && currentUserJson) {
            const user = JSON.parse(currentUserJson);
            return user;
        }
    }
    return statePersistFunc();
}