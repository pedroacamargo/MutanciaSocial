'use client'
import { useRouter, usePathname } from "next/navigation";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/user/user.action";
import { statePersist } from "./_components/auth/Auth.server";
import Navbar from "./_components/navbar/Navbar.component";

interface User {
    displayName: string,
    email: string,
    uid: string,
}

export default function Dashboard() {
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useDispatch();

    useEffect(() => {
        const statePersistFunc = async () => {
            const user = await statePersist();
            dispatch(setCurrentUser(user as User));
            // if (!user) router.push('/signup')
        }
        statePersistFunc();
    }, []);


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