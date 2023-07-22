'use client'
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
export default function Home() {
    const router = useRouter();
    const signOutUser = async () => {
        await signOut(auth);
        router.push("/");
    }
    console.log(auth)
    return (
        <div>
            <button onClick={signOutUser}>SignOut</button>
        </div>
    );
}