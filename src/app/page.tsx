'use client'
import { Helmet } from "react-helmet-async";
import Navbar from "./_components/navbar/Navbar.component";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { User } from "@/lib/interfaces/User.interface";

export default function Dashboard() {
    const { user } = useCurrentUser()

    // function to update old users that aren't registered with followers data
    useEffect(() => {
        const updateUsers = async () => {
            if (user) {
                const uid = user?.uid;
                const docRef = doc(db, databases.authDB, uid);
                const docSnap = (await getDoc(docRef)).data() as User;
                if (docSnap.followersAmount == null) {
                    await updateDoc(docRef, { followers: [], following: [], followersAmount: 0, followingAmount: 0 })
                }
            }
        }
        updateUsers();
    }, [user])

    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Oswald:wght@400;500&family=Raleway:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet"/>
            </Helmet>
            <Navbar/>
        </>
    );
}