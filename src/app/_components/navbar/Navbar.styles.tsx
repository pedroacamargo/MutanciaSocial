import { styled, keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";

const font1 = 'Montserrat';
const font2 = 'Oswald';
const font3 = 'Raleway';


export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    font-family: 'Montserrat', sans-serif;
    margin-bottom: 5px;
    padding: 5px 50px;
    background-color: #f1f0f0;
    border-bottom: 1px solid #dad6d6;
    box-shadow: 1px 1px 5px #746e6e58;
`

export const NavbarLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
`

export const NavbarLogoName = styled.span`
    font-family: ${font3}, sans-serif;
    font-size: 1.5em;
`

export const NavbarLinksContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2em;
    cursor: pointer;
    `

export const NavbarLink = styled(Link)`
    font-family: 'Montserrat', sans-serif;
    color: black;
    text-decoration: none;
    margin-right: 20px;
    padding: 7px;
    border-radius: 5px;
    transition: .5s;

    &:hover {
        background-color: #9998981f;
    }
`

export const UserLoggedContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-left: 1px solid #0000002b;
`

export const UsernameNavbar = styled.span`
    font-family: ${font3}, sans-serif;
    font-size: 0.8em;
    font-weight: bold;
    margin: 0 5px;
    cursor: pointer;
`

export const ProfilePic = styled(Image)`
    height: 30px;
    width: 30px;
    border-radius: 100%;
    margin-left: 5px;
    border: 1px solid #00000049;
`

interface PopUpProps {
    isOpened: boolean,
}

export const ProfileOptionsContainer = styled.div<PopUpProps>`
    visibility: ${(props) => props.isOpened ? 'visible' : 'hidden'};
    opacity: ${(props) => props.isOpened ? '1' : '0'};
    transition: .3s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    background-color: #f1f0f0;
    width: 200px;
    top: 45px;
    left: -30px;
    border-radius: 5px;
    border: 1px solid #00000030;
    `

export const DecorationPopUp = styled.div`
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    position: absolute;
    left: 50%;
    top: -6px;
    border-radius: 0 0 100px 0;
    background-color: #202020;
    border: 1px solid #00000030;
    border-bottom: none;
    border-right: none;
`

export const LoggedInAsContainer = styled.div`
    text-align: center;
    padding: 3px;
    border-bottom: 1px solid black;
    font-size: .6em;
    background-color: #202020;
    color: white;
    border-radius: 3px 3px 0 0;
    border: 1px solid black;
    box-sizing: content-box;
`

export const ProfilePopUpLink = styled(NavbarLink)`
    margin: 0;
    text-align: center;
    font-size: 1em;
    border-radius: 0;
    font-size: .8em;
    font-family: ${font3};
`

export const SignOutButton = styled(ProfilePopUpLink)`
    border-top: 1px solid #0000002f;
    background-color: #dfdcdc;
    font-weight: bold;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

`

export const NavbarLoadingSkeletonContainer = styled.div`
    margin-right: 10px;
    height: 40px;
    overflow: hidden;
    width: 100px;
    border: 1px solid white;
    border-radius: 10px;
`



export const NavbarLoadingSkeleton = styled.div`
    position: relative;
    left: -200px;
    height: 40px;
    width: 300px;
    opacity: .6;
    background-image: linear-gradient(to right, #cfcfcf 10%, #e9e2e2 50%, #bdbdbd);
    background-color: #e0dede;
    animation: swipe .5s infinite alternate;
    border-radius: 10px;

    @keyframes swipe {
        from {
            left: 0;
        }
        to {
            left: -200px;
        }
    }
    @-webkit-keyframes swipe {
        from {
            left: 0;
        }
        to {
            left: -200px;
        }
    }
`

export const UserNameLoadingContainer = styled.div`
    height: 20px;
    width: 60px;
    border-radius: 5px;
    overflow: hidden;
    margin-left: 5px;
`

export const UserNameLoadingSkeleton = styled.div`
position: relative;
    height: 20px;
    width: 180px;
    background-image: linear-gradient(to right, #cfcfcf 10%, #e9e2e2 50%, #bdbdbd);
    background-color: #e0dede;
    border-radius: 5px;
    animation: swipe2 .5s infinite alternate;
    @keyframes swipe2 {
        from {
            left: 0;
        }
        to {
            left: -120px;
        }
    }
    @-webkit-keyframes swipe2 {
        from {
            left: 0;
        }
        to {
            left: -120px;
        }
    }

`

export const UserProfilePictureLoadingContainer = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 100px;
    overflow: hidden;
    margin-left: 10px;
`

export const UserProfilePictureLoadingSkeleton = styled(UserNameLoadingSkeleton)`
    height: 40px;
`