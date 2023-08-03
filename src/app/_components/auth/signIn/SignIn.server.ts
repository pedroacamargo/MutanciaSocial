import { auth, db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { databases } from "@/lib/types/databases.types";

export async function SignIn({
    username,
    password,
}: {
    username: string,
    password: string,
}) {
    let email = '';
    const usersDBRef = collection(db, databases.authDB);
    const data = await getDocs(usersDBRef);

    // Get the email of the username
    const success = data.docs.some((doc) => {

        if (doc.data().displayName == username) {
            email = doc.data().email;
            return true;
        }

        return false;
    });

    if (success) {
        try {
            await signInWithEmailAndPassword(auth,email,password);
            return true; // signin success
        } catch (err) {
            console.error(err)
            return false; // signup failure
        }
    } else {
        console.error("Username doesn't exists in our data base :/");
    }
}