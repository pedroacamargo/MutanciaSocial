import { styled } from "styled-components";
import Image from "next/image";

const font1 = '"Montserrat", sans-serif';

export const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    height: 100vh; // remove this later
    padding-top: 70px;

    @media screen and (max-width: 780px) {
        padding: 0;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
`

export const UserCardWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 400px;
    padding: 50px;
    margin-right: 50px;
    border-right: 1px solid #cfcfcf;

    @media screen and (max-width: 780px) {
        display: none;
    }

`

export const PictureContainer = styled.div`
    position: relative;
`

type ProfilePicProps = {
    src: string,
}

export const ProfilePicture = styled.div<ProfilePicProps>`
    width: 300px;
    height: 300px;
    border-radius: 100%;
    border: 1px solid black;
    background-image: url(${props => props.src});
    background-position: center center;
    background-size: cover;
`

export const UserStatusPinPopPhrase = styled.span`
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    height: 40px;
    width: 18px;
    background-color: black;
    color: white;
    border-radius: 100%;
    border: 1px solid black;
    left: 0%;
    top: -1px;
    transition: .3s;
    z-index: -1;
    font-size: 0em;
    font-family: ${font1};
    font-weight: bold;
`

export const UserStatusPinEmoji = styled.span`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
export const UserStatusPinPop = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #e4e4e4;
    right: 0;
    top: 70%;
    border-radius: 100%;
    border: 1px solid black;
    cursor: pointer;
    transition: .3s;

    &:hover {
        background-color: #333333;
        border-radius: 100% 0 0 100%;
    }

    &:hover ${UserStatusPinPopPhrase} {
        background-color: #f3f3f3;
        color: black;
        border-radius: 0 10px 10px 0;
        left: 100%;
        width: 100px;
        font-size: 1em;
    }
`

export const UserCardStatusWrapper = styled.div`
    padding: 20px 0;
    margin-left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 70%;
    
    @media screen and (max-width: 780px) {
        width: 100%;
        padding: 10px;
        padding-left: 25px;
    }
`

export const UserFirstName = styled.h1`
    text-decoration: none;
    font-family: ${font1};
    font-size: 1.7em;
    font-weight: bold;
    white-space: nowrap;

    @media screen and (max-width: 450px) {
        font-size: 1.3em;
    }
`

export const UserDisplayName = styled(UserFirstName)`
    font-size: 1em;
    font-weight: normal;
    margin-bottom: 5px;
`

export const UserCardBio = styled.textarea`
    width: 100%;
    height: 100px;
    border: 1px solid #b8b8b8;
    border-radius: 5px;
    font-family: ${font1};
    resize: none;
    padding: 5px;
    color: black;
    background-color: #ececec;

    &:disabled {
        height: 80px;
        padding: 0;
        background-color: white;
        border: none;
        margin-bottom: 10px;
    }

    @media screen and (max-width: 780px) {
        height: 100px;
    }
`

export const AccountStatusWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const FollowersStatus = styled.div`
    font-family: ${font1};
    font-size: .9em;
    width: 120%;
    margin-bottom: 5px;

    @media screen and (max-width: 780px) {
        margin: 0;
    }
`

export const Status = styled.span`
    font-family: ${font1};
    font-size: .9em;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`

export const ProfileDashboardContainer = styled.div`
    width: 80%;
    max-width: 800px;
    height: 100vh;
    padding: 20px;
    @media screen and (max-width: 780px) {
        display: none;
    }

`

export const EditProfileInputLabel = styled.label`
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 2px;
    font-family: ${font1};
`

export const EditProfileName = styled.input`
    font-size: 1em;
    font-family: ${font1};
    padding: 5px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid #b8b8b8;
    background-color: #ececec;
    border-radius: 5px;
`

export const EditProfileDisplayName = styled.input`
    font-size: 1em;
    font-weight: normal;
    font-family: ${font1};
    margin-bottom: 5px;
    width: 100%;
    text-align: left;
    padding: 5px;
    margin-bottom: 10px;

    &:disabled {
        background-color: #57575757;
        border: 1px solid #9b9b9b;
        border-radius: 5px;
        color: #707070;
    }
`

export const EditProfilePictureInput = styled.input`
    margin: 5px 0;
    font-family: ${font1};
`

export const PopUp = styled.div`
    width: 80%;
    height: 80%;
    background-color: #ffffffd1;
    box-shadow: 1px 1px 10px #0000007a;
    border-radius: 5px;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    padding: 10px;
`

export const ClosePopUp = styled.div`
    padding: 2px 6px;
    background-color: #e02727;
    color: white;
    border-radius: 100%;
    position: absolute;
    right: 10px;
    top: 10px;
    font-family: ${font1};
    font-size: .7em;
    cursor: pointer;

    &:hover {
        background-color: red;
    }
`









/* Mobile */
export const MobileContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 780px) {
        display: flex;
    }
`

export const ProfileSectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #00000063;
    box-shadow: 2px 2px 10px #0000004e;
    width: 100%;
    background-color: #eeeded;
`

export const MobileProfileStatsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 400px;
    padding-bottom: 10px;

    @media screen and (max-width: 530px) {
        width: 300px;
    }

    @media screen and (max-width: 440px) {
        width: 50%;
    }
`

export const MobileBio = styled.div`
    width: 100%;
    font-size: .9em;
    padding-bottom: 5px;
    font-family: ${font1};
`