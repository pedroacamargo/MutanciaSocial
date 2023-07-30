'use client'
import { useRouter, usePathname } from "next/navigation";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "@/redux/user/user.action";
import Navbar from "./_components/navbar/Navbar.component";

export default function Dashboard() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAsync() as any);
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