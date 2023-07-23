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
