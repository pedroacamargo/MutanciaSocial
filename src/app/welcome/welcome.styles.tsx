import { styled } from "styled-components";

const font1 = '"Montserrat", sans-serif';
const font2 = '"Oswald", sans-serif';

export const HeaderSteps = styled.h1`
    font-family: ${font1};
    font-weight: 600;
    white-space: nowrap;
    @media screen and (max-width: 700px) {
        font-size: 1.3em;
    }

`

export const SubHeaderSteps = styled.h2`
    font-family: ${font1};
    font-weight: 400;
    font-size: 1.1em;
    padding: 5px;
    width: 650px;
    text-align: center;
    @media screen and (max-width: 700px) {
        width: 80%;
        font-size: .9em;
        text-align: center;
    }

    @media screen and (max-width: 400px) {
        font-size: .75em;
    }

`

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const StepsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 30px;
    box-sizing: border-box;
`

export const LoaderSkeleton = styled.div`
    width: 500px;
    height: 2px;
    margin-top: 10px;
    background-color: #c5c5c5;

    @media screen and (max-width: 700px) {
        width: 300px;
    }

`

interface LoaderFillProps {
    width: string,
}

export const LoaderFill = styled.div<LoaderFillProps>`
    width: ${(props) => props.width};
    height: 100%;
    background-color: black;
    transition: 1s;
`


export const AuthStepsContainer = styled.div`
    height: 50px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
`

export const StepBall = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 100%;
    margin: 5px;
`