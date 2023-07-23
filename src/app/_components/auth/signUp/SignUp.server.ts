import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDocs, collection } from "firebase/firestore";

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
    const usersDBRef = collection(db, "authentication");
    const data = await getDocs(usersDBRef);


    if (password != confirmPassword) return;

    const repeatedUser = data.docs.some((doc) => {
        if (doc.data().displayName != username) return false;
        return true;
    });

    if (repeatedUser) {
        console.error("Username already exists!");
        return false;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(usersDBRef, {
            displayName: username,
            email: auth.currentUser?.email,
            uid: auth.currentUser?.uid,
        });
        return true; // signin success
    } catch (err) {
        console.error(err)
        return false; // signup failure
    }
}