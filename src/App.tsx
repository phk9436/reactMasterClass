import React, { useState } from "react";
import Router from "./Router";
import GlobalStyle from "./style/GolbalStyle";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import styled from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

