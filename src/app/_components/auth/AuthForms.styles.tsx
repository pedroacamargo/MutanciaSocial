import Link from "next/link";
import { styled } from "styled-components";

export const SignInForm = styled.form`
    margin-top: 10px;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 500px) {
        width: 100%;
    }
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
    @media screen and (max-width: 500px) {
        width: 80%;
    }
`

export const SignInSubmitButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 5px;
    width: 100%;
    @media screen and (max-width: 500px) {
        font-size: .9em;
    }

    @media screen and (max-width: 340px) {
        flex-direction: column;
    }
`

export const SignUpSubmitButtonsContainer = styled(SignInSubmitButtonsContainer)`
    margin-top: 10px;
    flex-direction: column;
`

export const AlreadyHaveAnAccount = styled(Link)`
    color: black;
    padding: 5px;
    font-weight: bold;
    font-size: .8em;
`