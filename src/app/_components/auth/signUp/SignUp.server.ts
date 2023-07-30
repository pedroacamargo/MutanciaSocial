import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection } from "firebase/firestore";
import { UserCredentials } from "@/lib/interfaces/UserCredentials.interface";
import { SaveInDatabase, isInAuthDB } from "../Auth.server";
import { databases } from "@/lib/types/databases.types";

export async function SignUp(user: UserCredentials) {
    const { username, email, password, confirmPassword } = user;
    
    const usersDBRef = collection(db, databases.authDB);

    if (password != confirmPassword) return;

    const alreadyExist = await isInAuthDB(email);

    if (alreadyExist) {
        console.error("Username already exists!");
        return false;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
        await SaveInDatabase({ 
            dbName: databases.authDB, 
            payload: {
                displayName: username,
                email: auth.currentUser?.email,
                uid: auth.currentUser?.uid,
            }});


        return true; // signin success
    } catch (err) {
        console.error(err)
        return false; // signup failure
    }
}