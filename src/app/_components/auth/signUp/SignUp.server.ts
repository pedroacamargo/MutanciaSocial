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
        console.error("Email already in use!");
        return false;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
        /** @TODO -> Change SaveInDatabase to SaveUserInDatabase */

        await SaveInDatabase({ 
            dbName: databases.authDB, 
            payload: {
                displayName: username,
                email: auth.currentUser?.email,
                uid: auth.currentUser?.uid,
                bio: '',
                age: 0,
                gender: '',
                country: '',
                height: 0,
                weight: 0,
                sports: [],
                acceptedConditions: false,
            }});


        return true; // signup success
    } catch (err) {
        console.error(err)
        return false; // signup failure
    }
}