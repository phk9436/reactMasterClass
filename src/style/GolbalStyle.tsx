import { createGlobalStyle, css } from "styled-components";
import { ITheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: ITheme }>`

    *, ::before, ::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    ul {
        list-style-type: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    html, body{
        min-height: 100%;
    }

    body{
        line-height: 1;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 300;
        color: ${({ theme }) => theme.white.darker};
        line-height: 1.2;
    }
    

`;

export default GlobalStyle;
