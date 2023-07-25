'use client'
import { isLoggedIn } from "../_components/auth/Auth.server";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
export default function Home() {
    const router = useRouter();
    const signOutUser = async () => {
        await signOut(auth);
        router.push("/");
    }

    const checkIfLogged = async () => {
        const isLogged = await isLoggedIn();
        console.log(isLogged);
    }


    return (
        <div>
            <button onClick={signOutUser}>SignOut</button>
            <button onClick={checkIfLogged}>Check</button>
        </div>
    );
}