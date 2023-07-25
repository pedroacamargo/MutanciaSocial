import { createGlobalStyle } from "styled-components"

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