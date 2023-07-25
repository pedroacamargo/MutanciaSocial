'use client'
import {
    NavbarContainer,
    NavbarLinksContainer,
    NavbarLink,
    ProfilePic,
} from "./Navbar.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '@/redux/user/user.selector';
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

import Image from "next/image";

export default function Navbar() {
    const user = useSelector(selectCurrentUser)
    const router = useRouter();
    const signOutUser = async () => {
        await signOut(auth);
        router.push("/");
    }

    return (
        <>
        {user ? 
            <NavbarContainer>
                <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={30} height={30}/>
                <button onClick={signOutUser}>SignOut</button>
                
                <NavbarLinksContainer>
                    <NavbarLink href='/asdasd'>Home</NavbarLink>
                    <NavbarLink href='/asdasd'>Dashboard</NavbarLink>
                    <NavbarLink href='/asdasd'>Settings</NavbarLink>
                    {user.displayName}
                    <ProfilePic></ProfilePic>
                </NavbarLinksContainer>
            </NavbarContainer> 

            : 

            <NavbarContainer>
                <NavbarLink href='/'>Home</NavbarLink>
                <div>
                    <button onClick={signOutUser}>SignOut</button>
                </div>
            </NavbarContainer>
        }
        </>
    );
}