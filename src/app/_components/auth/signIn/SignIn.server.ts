import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserFromAuthDBWithUsername } from "../Auth.server";
import { SignInCredentials } from "@/lib/interfaces/UserCredentials.interface";

export async function SignIn(userCredentials: SignInCredentials) {
    const { username, password } = userCredentials;
    const userData = await getUserFromAuthDBWithUsername(username);

    if (userData) {
        try {
            await signInWithEmailAndPassword(auth,userData.email,password);
            return true; // signin success
        } catch (err) {
            console.error(err)
            return false; // signup failure
        }
    } else {
        console.error("The username doesn't exists in our database :(")
        return false;
    }
}