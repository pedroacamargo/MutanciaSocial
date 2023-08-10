import { styled } from "styled-components";
import Image from "next/image";

const font1 = '"Montserrat", sans-serif';

export const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    height: 100vh; // remove this later
    padding: 70px 0 0 0;
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
`

export const PictureContainer = styled.div`
    position: relative;
`

export const ProfilePicture = styled(Image)`
    width: 300px;
    height: 300px;
    border-radius: 100%;
    border: 1px solid black;
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
`

export const UserFirstName = styled.h1`
    font-family: ${font1};
    font-size: 2em;
    font-weight: bold;
    white-space: nowrap;
`

export const UserDisplayName = styled(UserFirstName)`
    font-size: 1em;
    font-weight: normal;
`
export const UserCardBio = styled.textarea`
    width: 100%;
    height: 50px;
    border: none;
    margin-top: 10px;
    font-family: ${font1};
    resize: none;
    padding: 0px;
    color: black;
    background-color: white;
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
`

export const ProfileDashboardContainer = styled.div`
    width: 80%;
    max-width: 800px;
    height: 100vh;
    padding: 20px;
`