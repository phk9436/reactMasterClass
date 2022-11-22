import React, { useState } from "react";
import Router from "./Router";
import GlobalStyle from "./style/GolbalStyle";
import { Helmet } from "react-helmet";
import { darktheme, lighttheme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { themeState } from "atoms/atoms";
import styled from "styled-components";

function App() {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lighttheme : darktheme}>
        <Helmet>
          <title>코인</title>
        </Helmet>
        <ToggleBtn type="button" onClick={toggleTheme}>
          {theme === "light" ? "DARK" : "LIGHT"}
        </ToggleBtn>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

const ToggleBtn = styled("button")`
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.textBrightColor};
  color: ${(props) => props.theme.bgColor};
  width: 100px;
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
`;
