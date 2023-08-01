import { styled } from "styled-components";

const font1 = '"Montserrat", sans-serif';
const font2 = '"Oswald", sans-serif';

export const HeaderSteps = styled.h1`
    font-family: ${font1};
    font-weight: 600;
`

export const SubHeaderSteps = styled.h2`
    font-family: ${font1};
    font-weight: 400;
    font-size: 1.1em;
    padding: 5px;
`

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
`

export const StepsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 80vh;
`

export const LoaderSkeleton = styled.div`
    width: 500px;
    height: 2px;
    margin-top: 10px;
    background-color: #c5c5c5;
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
    position: absolute;
    bottom: 30px;
    height: 50px;
    left: 50%;
    transform: translate(-50%, -50%);

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