'use client'
import {
    NavbarContainer,
    NavbarLinksContainer,
    NavbarLink,
    ProfilePic,
    NavbarLogoContainer,
    NavbarLogoName,
    UserLoggedContainer,
    UsernameNavbar,
    ProfileOptionsContainer,
    DecorationPopUp,
    ProfilePopUpLink,
    SignOutButton,
    LoggedInAsContainer
} from "./Navbar.styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAsync } from "@/redux/user/user.action";
import { selectCurrentUser, selectUserIsLoading } from '@/redux/user/user.selector';
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { FaCaretDown } from "react-icons/fa";


import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarLoading from "./NavbarLoading.component";

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser)
    const isUserLoading = useSelector(selectUserIsLoading);
    const [profilePopUpOpened, setProfilePopUpOpened] = useState(false);
    

    const signOutUser = async () => {
        await signOut(auth)
        dispatch(fetchUserAsync() as any);
    }

    const toggleProfilePopUp = () => setProfilePopUpOpened(!profilePopUpOpened);

    useEffect(() => {
        dispatch(fetchUserAsync() as any);
    }, []);

    if (isUserLoading) {
        return <NavbarLoading />
    }

    return (
        <>
        {user?.displayName ? 
            <NavbarContainer>

                <NavbarLogoContainer>
                    <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={45} height={45}/>
                    <NavbarLogoName>Mutantial</NavbarLogoName>
                </NavbarLogoContainer>

                <NavbarLinksContainer>
                    <NavbarLink href='/dashboard'>Home</NavbarLink>
                    <NavbarLink href='/dashboard'>Explore</NavbarLink>
                    <NavbarLink href='/dashboard'>Guides</NavbarLink>
                    <NavbarLink href='/dashboard'>Workouts</NavbarLink>
                    <UserLoggedContainer onClick={toggleProfilePopUp}>
                        <FaCaretDown style={{transform: `rotate(${profilePopUpOpened ? 180 : 0}deg)`, transition: '.5s'}}/>
                        <UsernameNavbar>@{user.displayName}</UsernameNavbar>

                        {user?.photoURL ? (
                            <ProfilePic src={`${user.photoURL}`} alt="Mutancia Social Logo" width={45} height={45}/>
                        ) : (
                            <ProfilePic src="/Unknown_person.png" alt="Mutancia Social Logo" width={45} height={45}/>
                        )}
                        
                        <ProfileOptionsContainer isOpened={profilePopUpOpened}>
                            <DecorationPopUp></DecorationPopUp>
                            <LoggedInAsContainer>
                                Logged in as <strong>{user.displayName}</strong>
                            </LoggedInAsContainer>

                            <ProfilePopUpLink href='/teste'>My Profile</ProfilePopUpLink>
                            <ProfilePopUpLink href='/teste'>My Posts</ProfilePopUpLink>
                            <ProfilePopUpLink href='/teste'>Settings</ProfilePopUpLink>
                            
                            <SignOutButton onClick={signOutUser} href='/'>Sign Out</SignOutButton>
                        </ProfileOptionsContainer>

                    </UserLoggedContainer>
                </NavbarLinksContainer>
            </NavbarContainer> 

            : 

            <NavbarContainer>
                <NavbarLogoContainer>
                    <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={45} height={45}/>
                    <NavbarLogoName>Mutantial</NavbarLogoName>
                </NavbarLogoContainer>
                <NavbarLinksContainer>
                    <NavbarLink href='/dashboard'>Home</NavbarLink>
                    <NavbarLink href='/dashboard'>Explore</NavbarLink>
                    <NavbarLink href='/dashboard'>Guides</NavbarLink>
                    <NavbarLink href='/dashboard'>Workouts</NavbarLink>
                    <UserLoggedContainer onClick={toggleProfilePopUp}>
                        <FaCaretDown style={{transform: `rotate(${profilePopUpOpened ? 180 : 0}deg)`, transition: '.5s', cursor: 'pointer'}}/>
                        <UsernameNavbar>Not logged in</UsernameNavbar>

                        {user?.photoURL ? (
                            <ProfilePic src={`${user.photoURL}`} alt="Mutancia Social Logo" width={45} height={45}/>
                        ) : (
                            <ProfilePic src="/Unknown_person.png" alt="Mutancia Social Logo" width={45} height={45}/>
                        )}

                        <ProfileOptionsContainer isOpened={profilePopUpOpened}>
                            <DecorationPopUp></DecorationPopUp>
                            <LoggedInAsContainer>
                                Logged in as <strong>None</strong>
                            </LoggedInAsContainer>

                            
                            <SignOutButton onClick={signOutUser} href='/signin'>Sign In</SignOutButton>
                        </ProfileOptionsContainer>

                    </UserLoggedContainer>
                </NavbarLinksContainer>
            </NavbarContainer>
        }
        </>
    );
}