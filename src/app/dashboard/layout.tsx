'use client'
import Navbar from "../_components/navbar/Navbar.component";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathName = usePathname();

    return (
        <>
            {
                pathName !== '' ? <Navbar/> : null
            }
            {children}
        </>
    );
}
