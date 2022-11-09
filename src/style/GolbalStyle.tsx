import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`

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
        ${(props) => {
          const { textColor, bgColor } = props.theme;
          return css`
            background-color: ${bgColor};
            color: ${textColor};
          `;
        }}
    }

`;

export default GlobalStyle;
