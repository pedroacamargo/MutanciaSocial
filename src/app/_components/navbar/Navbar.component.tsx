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
    LoggedInAsContainer,
    NavbarLinkDisabled,
    MobileNavbarContainer,
    MobileLink,
    SurePopUp,
    PopUpAlert
} from "./Navbar.styles";
import { useSelector } from "react-redux";
import { selectUserIsLoading } from '@/redux/user/user.selector';
import { FaCaretDown } from "react-icons/fa";
import { useSignOut } from "@/hooks/useSignOut";
import Image from "next/image";
import { useState } from "react";
import NavbarLoading from "./NavbarLoading.component";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { PiSignInBold } from "react-icons/pi"
import { PostHeaderName } from "../feed/home.styles";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";

export default function Navbar() {
    const { user, setUser } = useCurrentUser();
    const { signOutUser } = useSignOut(setUser);
    const isUserLoading = useSelector(selectUserIsLoading);
    const [profilePopUpOpened, setProfilePopUpOpened] = useState(false);
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    const router = useRouter();

    const handleSignOut = () => {
        signOutUser();
        router.refresh()
    }
    
    const signOut = async () => {
        await signOutUser();
    } 
    const toggleProfilePopUp = () => setProfilePopUpOpened(!profilePopUpOpened);
    
    if (isUserLoading) {
        return <NavbarLoading />
    }

    return (
        <>
        {user?.displayName ? 
        <>
            <NavbarContainer>

                <NavbarLogoContainer>
                    <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={45} height={45}/>
                    <NavbarLogoName>Mutantial</NavbarLogoName>
                </NavbarLogoContainer>

                <NavbarLinksContainer>
                    <NavbarLink href='/'>Home</NavbarLink>
                    <NavbarLink href='/explore'>Explore</NavbarLink>
                    <NavbarLinkDisabled href='/'>Guides</NavbarLinkDisabled>
                    <NavbarLinkDisabled href='/'>Workouts</NavbarLinkDisabled>
                    <UserLoggedContainer onClick={toggleProfilePopUp}>
                        <FaCaretDown style={{transform: `rotate(${profilePopUpOpened ? 180 : 0}deg)`, transition: '.5s'}}/>
                        <UsernameNavbar>@{user.displayName}</UsernameNavbar>

                        {auth.currentUser?.photoURL ? (
                            <ProfilePic src={`${auth.currentUser.photoURL}`} alt="Mutancia Social Logo" width={45} height={45}/>
                        ) : (
                            <ProfilePic src="/Unknown_person.png" alt="Mutancia Social Logo" width={45} height={45}/>
                        )}
                        
                        <ProfileOptionsContainer isOpened={profilePopUpOpened}>
                            <DecorationPopUp></DecorationPopUp>
                            <LoggedInAsContainer>
                                Logged in as <strong>{user.displayName}</strong>
                            </LoggedInAsContainer>

                            <ProfilePopUpLink href={`/profile/${user.uid}`}>My Profile</ProfilePopUpLink>
                            <ProfilePopUpLink href='/'>My Posts</ProfilePopUpLink>
                            <ProfilePopUpLink href='/'>Settings</ProfilePopUpLink>
                            
                            <SignOutButton onClick={handleSignOut} href='/'>Sign Out</SignOutButton>
                        </ProfileOptionsContainer>

                    </UserLoggedContainer>
                </NavbarLinksContainer>
            </NavbarContainer> 


            <MobileNavbarContainer>

                <MobileLink href={'/'}>
                    <AiFillHome></AiFillHome>
                </MobileLink>
                <MobileLink href={'/explore'}>
                    <AiOutlineSearch></AiOutlineSearch>
                </MobileLink>
                <MobileLink href={`/profile/${user.uid}`}>
                    {auth.currentUser?.photoURL ? (
                        <ProfilePic style={{width: '25px', height: '25px'}} src={`${auth.currentUser.photoURL}`} alt="Mutancia Social Logo" width={45} height={45}/>
                    ) : (
                        <ProfilePic src="/Unknown_person.png" alt="Mutancia Social Logo" width={45} height={45}/>
                    )}                
                </MobileLink>
                <PiSignInBold onClick={() => setIsPopUpOpened(true)}></PiSignInBold>
                <SurePopUp style={{display: isPopUpOpened ? "flex" : "none"}}>
                    <PopUpAlert>
                        <PostHeaderName>Do you want to sign out?</PostHeaderName>
                        <div style={{display: 'flex'}}>
                            <ButtonBase onClick={handleSignOut}>Yes</ButtonBase>
                            <ButtonInverted onClick={() => setIsPopUpOpened(false)}>No</ButtonInverted>
                        </div>
                    </PopUpAlert>
                </SurePopUp>
            </MobileNavbarContainer>
        </>
            : 
        <>
            <NavbarContainer>
                <NavbarLogoContainer>
                    <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={45} height={45}/>
                    <NavbarLogoName>Mutantial</NavbarLogoName>
                </NavbarLogoContainer>
                <NavbarLinksContainer>
                    <NavbarLink href='/'>Home</NavbarLink>
                    <NavbarLink href='/explore'>Explore</NavbarLink>
                    <NavbarLinkDisabled href='/'>Guides</NavbarLinkDisabled>
                    <NavbarLinkDisabled href='/'>Workouts</NavbarLinkDisabled>
                    <UserLoggedContainer onClick={toggleProfilePopUp}>
                        <FaCaretDown style={{transform: `rotate(${profilePopUpOpened ? 180 : 0}deg)`, transition: '.5s', cursor: 'pointer'}}/>
                        <UsernameNavbar>Not logged in</UsernameNavbar>

                        <ProfilePic src="/Unknown_person.png" alt="Mutancia Social Logo" width={45} height={45}/>

                        <ProfileOptionsContainer isOpened={profilePopUpOpened}>
                            <DecorationPopUp></DecorationPopUp>
                            <LoggedInAsContainer>
                                Logged in as <strong>None</strong>
                            </LoggedInAsContainer>

                            
                            <SignOutButton href='/signin'>Sign In</SignOutButton>
                        </ProfileOptionsContainer>

                    </UserLoggedContainer>
                </NavbarLinksContainer>
            </NavbarContainer>

            <MobileNavbarContainer>

                <MobileLink href={'/'}>
                    <AiFillHome></AiFillHome>
                </MobileLink>
                <MobileLink href={'/explore'}>
                    <AiOutlineSearch></AiOutlineSearch>
                </MobileLink>
                <MobileLink href={`/signin`}>
                    <PiSignInBold></PiSignInBold>
                </MobileLink>

            </MobileNavbarContainer>


        </>
        }
        </>
    );
}