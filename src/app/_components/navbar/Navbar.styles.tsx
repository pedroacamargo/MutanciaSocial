import { styled } from "styled-components";
import Link from "next/link";

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    font-family: 'Montserrat', sans-serif;
    margin-bottom: 5px;
    padding: 10px 50px;
    background-color: #f1f0f0;
    border-bottom: 1px solid #dad6d6;
    box-shadow: 1px 1px 5px #746e6e58;
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
`

export const ProfilePic = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background-color: black;
    margin: 0 5px;
`