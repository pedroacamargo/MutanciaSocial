'use client'
import { Helmet } from "react-helmet-async"
import Navbar from "../_components/navbar/Navbar.component"

export default function ExploreLayout({ children }: { children: React.ReactNode }) {


    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Oswald:wght@400;500&family=Raleway:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet"/>
            </Helmet>
            <Navbar />
            {children}
        </>
    )
}