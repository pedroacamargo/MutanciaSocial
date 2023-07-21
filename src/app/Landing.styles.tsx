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
`


interface StripContainerProps {
    linesalignment: 'left' | 'center' | 'right',
}

export const StripsContainer = styled.div<StripContainerProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: ${(props) => props.linesalignment === 'left' ? 'flex-start' : props.linesalignment === 'center' ? 'center' : props.linesalignment === 'right' ? 'flex-end' : 'stretch'};
    margin: 125px;
    
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

export const ButtonBase = styled.button`
    padding: 10px;
    font-size: 1.2em;
    font-family: Arial, Helvetica, sans-serif;
    background-color: black;
    color: white;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 10px;
    transition: .5s;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: white;
        color: black;
    }
`

export const ButtonInverted = styled(ButtonBase)`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
        background-color: black;
        color: white;
    }
`


export const ErrorBox = styled.div`
    padding: 10px;
    background-color: #f74242;
    color: white;
    border-radius: 5px;
    border: 1px solid black;
    margin: 10px;
    font-weight: bold;
    font-size: .9em;
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
