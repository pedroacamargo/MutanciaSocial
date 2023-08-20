import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection } from "firebase/firestore";
import { UserCredentials } from "@/lib/interfaces/UserCredentials.interface";
import { SaveInDatabase, SaveUserInDataBase, isInAuthDB } from "../Auth.server";
import { databases } from "@/lib/types/databases.types";

export async function SignUp(user: UserCredentials): Promise<{ emailError: boolean, usernameError: boolean, passwordError: boolean }> {
    const { username, email, password, confirmPassword } = user;
    
    const usersDBRef = collection(db, databases.authDB);

    if (password != confirmPassword) return {
        emailError: false,
        usernameError: false,
        passwordError: true,
    };

    const alreadyExist = await isInAuthDB(email, username);

    if (alreadyExist.emailRepeated) {
        console.error("Email already in use!");
        return {
            emailError: true,
            usernameError: false,
            passwordError: false,
        }
    } else if (alreadyExist.usernameRepeated) {
        console.error("Username already in use!");
        return {
            emailError: false,
            usernameError: true,
            passwordError: false,
        }
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
        if (auth.currentUser) {

            await SaveUserInDataBase({ 
                acceptedConditions: false,
                followers: [],
                following: [],
                followingAmount: 0,
                followersAmount: 0,
                profilePic: auth.currentUser?.photoURL ? auth.currentUser.photoURL : '/Unknown_person.png',
                email: email, 
                displayName: username,
                uid: auth.currentUser.uid,
                headerName: null,
                bio: null,
                age: null,
                gender: null,
                country: null,
                height: null,
                weight: null,
                sports: null,
                comments: [],
                posts: [],
            });
            
        }

        return {
            emailError: false,
            usernameError: false,
            passwordError: false,
        }; // signup success
    } catch (err) {
        console.error(err)
        return {
            emailError: true,
            usernameError: true,
            passwordError: true,
        }; // signup failure
    }
}