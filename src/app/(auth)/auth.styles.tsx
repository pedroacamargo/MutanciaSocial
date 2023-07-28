import { styled, keyframes } from "styled-components";

const randomizeStripSize = keyframes`
    from {
        width: 60%;
    }
    to {
        width: 0;
    }
`

const wobble1 = keyframes`
    0%, 100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(calc(var(--uib-size) * 0.2)) scale(1.1);
    }
`

const wobble2 = keyframes`
    0%, 100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(calc(var(--uib-size) * -0.2)) scale(1.1);
    }
`

const rotate01561 = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`

export const BigLogoContainer = styled.div`
    width: 65%;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 800px) {
        display: none;
    }
`

export const StripsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    margin: 125px;
`
export const StripsContainerRight = styled(StripsContainer)`
    align-items: flex-end;
`

export const StripsContainerLeft = styled(StripsContainer)`
    align-items: flex-start;
`

export const StripOne = styled.div`
    height: 1px;
    width: 300px;
    margin: 2px;
    background-color: #ffffff26;
    animation: ${randomizeStripSize} 10s linear infinite alternate;
    `

export const StripTwo = styled(StripOne)`
    width: 60%;
    animation-delay: 10s;
    `

export const StripThree = styled(StripOne)`
    width: 60%;
    animation-delay: 5s;
`

export const FormsContainer = styled(BigLogoContainer)`
    width: 35%;
    min-width: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    box-sizing: border-box;
    
    @media screen and (max-width: 800px) {
        width: 100%;
        min-width: 0;
    }

    /* Firefox custom scrollbar */
    &::-webkit-scrollbar {
        display: block; /* Safari and Chrome */
    }

    /* Webkit, Edge, and Opera custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f1eeee; /* Change the track background color */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #000000; /* Change the thumb color */
        border-radius: 5px; /* Round the edges of the thumb */
    }
`

export const HeaderDividerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const DividerRow = styled.div`
    width: 40%;
    margin: 10px;
    height: 1px;
    background-color: black;
`

interface LoadingMomentumProps {
    display: string,
}

export const LoadingMomentum = styled.div<LoadingMomentumProps>`
    --uib-size: 40px;
    --uib-speed: 1s;
    --uib-color: black;
    position: absolute;
    bottom: 10px;
    right: 10px;
    display:  ${(props) => props.display === 'true' ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    height: var(--uib-size);
    width: var(--uib-size);
    animation: ${rotate01561} var(--uib-speed) linear infinite;

    &::before, &::after {
        content: '';
        height: 25%;
        width: 25%;
        border-radius: 50%;
        background-color: var(--uib-color);
    }

    &::before {
        animation: ${wobble2} calc(var(--uib-speed) * 1.25) ease-in-out infinite;
        margin-right: 10%;
    }

    &::after {
        animation: ${wobble1} calc(var(--uib-speed) * 1.25) ease-in-out infinite;
    }
`
