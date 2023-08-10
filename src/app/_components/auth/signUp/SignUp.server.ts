import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection } from "firebase/firestore";
import { UserCredentials } from "@/lib/interfaces/UserCredentials.interface";
import { SaveInDatabase, SaveUserInDataBase, isInAuthDB } from "../Auth.server";
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

        await SaveUserInDataBase({ 
            acceptedConditions: false,
            followers: [],
            following: [],
            followingAmount: 0,
            followersAmount: 0,
            profilePictureURL: auth.currentUser?.photoURL ? auth.currentUser.photoURL : '/Unknown_person.png',
            email: email, 
            displayName: username,
            uid: auth.currentUser?.uid,
            headerName: null,
            bio: null,
            age: null,
            gender: null,
            country: null,
            height: null,
            weight: null,
            sports: null,
        });


        return true; // signup success
    } catch (err) {
        console.error(err)
        return false; // signup failure
    }
}