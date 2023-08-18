import { BsSearch } from "react-icons/bs";
import { styled } from "styled-components";
import { ProfilePicture } from "../profile/profile.styles";
import Link from "next/link";

const font1 = '"Montserrat", sans-serif';

export const ExploreContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    box-sizing: border-box;
    padding-bottom: 50px;
`

export const SearchBar = styled.input`
    padding: 10px;
    font-size: 1.2em;
    font-family: ${font1};
    outline: none;
    border: 1px solid black;

`

export const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    max-width: 1000px;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9e7e7;
`

export const Bar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const SearchBarHelper = styled.div`
    width: 99.5%;
    position: absolute;
    top: 95%;
    background-color: #f5f5f5;
    border: 1px solid #aaa9a9;
    z-index: 99;

`

export const SubmitButton = styled.button`
    padding: 10px;   
`

export const SearchBarHelperState = styled.div`
    padding: 15px;
    color: #b3b3b3;
    font-family: ${font1};
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: white;
    }

    em {
        color: black;
    }
`

export const ExploreCardContainer = styled.div`
    width: 60%;
    max-width: 1000px;
    background-color: rgb(48, 54, 61);
    border-radius: 5px;
    margin-top: 10px;
    box-sizing: border-box;
    display: flex;
    box-shadow: 5px 5px 10px #00000060;
    transition: .3s;
    transform: translate(0, 0);
    cursor: default;

    &:hover {
        transform: translate(-4px, -2px);        
        box-shadow: 5px 5px 15px #00000060;
    }
`

type ProfilePictureProps = {
    src: string,
}

export const ExploreCardProfilePicture = styled(ProfilePicture)`
    width: 150px;
    height: 150px;
    border-radius: 0;
    border: 1px solid black;
    background-image: url(${props => props.src});
    background-position: center center;
    background-size: cover;
`

export const ExploreCardStatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding:  5px;
    width: 80%;
`

export const ExploreCardStatsHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const ExploreCardBio = styled.div`
    font-size: .85em;
    color: #dadada;
    font-family: ${font1};
    width: 100%;
    box-sizing: border-box;
    padding-top: 5px;
    padding-left: 10px;
`

export const ExploreCardVisitButton = styled(Link)`
    font-family: ${font1};
    font-size: .9em;
    color: white;
    border: 1px solid rgb(60, 64, 68);
    padding: 5px 10px;
    border-radius: 7px;
    background-color: rgb(80, 83, 85);
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        border: 1px solid #7a7a7a;
    }
`

export const ExploreRecommendedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 1000px;
`

export const ExploreRecommendedWarning = styled.h2`
    color: #999999;
    font-family: ${font1};
    font-weight: normal;
    font-size: 1.2em;
    padding: 20px;

    text-align: center;
`

export const ExploreRecommendedDivider = styled.div`
    font-size: 1.5em;
    font-family: ${font1};
    font-weight: bold;
    width: 100%;
    padding: 5px;
    padding-left: 10px;
    border-bottom: 1px solid #000000;
`