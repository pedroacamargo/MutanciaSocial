import { auth, db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function SignIn({
    username,
    password,
}: {
    username: string,
    password: string,
}) {
    let email = '';
    const usersDBRef = collection(db, "authentication");
    const data = await getDocs(usersDBRef);

    // Get the email of the username
    const success = data.docs.some((doc) => {

        //console.log(`displayName: ${doc.data().displayName} | username: ${username}`);

        if (doc.data().displayName == username) {
            email = doc.data().email;
            return true;
        }

        return false;
    });

    // Debug:
    //console.log(success)
    //console.log(email);

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