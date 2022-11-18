import React, { useState } from "react";
import Router from "./Router";
import GlobalStyle from "./style/GolbalStyle";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
