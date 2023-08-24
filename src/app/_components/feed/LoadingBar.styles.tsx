import { styled } from "styled-components";

export const LoaderContainer = styled.div`
    width: 100%;
    height: 4px;
    background-color: #c7c7c783;
    position: absolute;
    top: 55px;
    @media screen and (max-width: 780px) {
        top: 0;
    }
`

export const LoadingCompletion = styled.div`
    height: 100%;
    width: 0;
    background-color: black;
    transition: .5s;
`