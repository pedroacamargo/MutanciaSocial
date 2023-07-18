import { styled, keyframes } from "styled-components";

const randomizeStripSize = keyframes`
    from {
        width: 60%;
    }
    to {
        width: 0;
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
    linesAlignment: 'left' | 'center' | 'right',
}

export const StripsContainer = styled.div<StripContainerProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: ${({ linesAlignment }) => linesAlignment === 'left' ? 'flex-start' : linesAlignment === 'center' ? 'center' : linesAlignment === 'right' ? 'flex-end' : 'stretch'};
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

export const SignInForm = styled.form`
    margin-top: 10px;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const SignUpForm = styled(SignInForm)``


export const InputContainer = styled.div`
    width: 80%;
    border: 1px solid #00000092;
    box-shadow: 2px 2px 10px #00000061;
    background-color: black;
    border-radius: 10px;
    display: flex;
    justify-content: end;
    margin: 5px;
`

export const InputForm = styled.input`
    padding: 6px;
    border: none;
    width: 82%;
    border-radius: 9px;
    outline: none;
    font-size: 1.3em;
`

export const RememberMeContainer = styled.div`
    display: flex;
    width: 350px;
    margin-top: 7px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`

export const SignInSubmitButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 5px;
    width: 100%;
`

export const SignUpSubmitButtonsContainer = styled(SignInSubmitButtonsContainer)`
    margin-top: 10px;
    flex-direction: column;
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