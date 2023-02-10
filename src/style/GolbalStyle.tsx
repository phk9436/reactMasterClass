import { createGlobalStyle, css } from "styled-components";
import { Itheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: Itheme }>`

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
    }

    html, body{
        min-height: 100%;
    }

    body{
        line-height: 1;
        background-color: ${({ theme }) => theme.bgColor};
    }

`;

export default GlobalStyle;
