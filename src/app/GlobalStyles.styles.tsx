import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Oswald:wght@400;500&display=swap');

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