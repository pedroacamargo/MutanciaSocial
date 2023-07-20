import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export async function SignUp({
    username,
    email,
    password,
    confirmPassword
}: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}) {
    if (password != confirmPassword) return;

    const usersDBRef = collection(db, "authentication");

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(usersDBRef, {
            displayName: username,
            email: auth.currentUser?.email,
            uid: auth.currentUser?.uid,
        });
    } catch (err) {
        console.error(err)
    }
}