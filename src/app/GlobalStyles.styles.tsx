import { createGlobalStyle, styled } from "styled-components"

const GlobalStyle = createGlobalStyle`
    :root {
        --font1: 'Montserrat', sans-serif;
        --font2: 'Oswald', sans-serif;
    }

    * {
        padding: 0;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
    }
` 

export default GlobalStyle

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