import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./clear.css";

function App() {
  const [val, setVal] = useState("");

  const changeVal = (e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };

  const submitVal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      <h1>proptected</h1>
      <form onSubmit={(e) => submitVal(e)}>
        <input
          type="text"
          placeholder="userName"
          value={val}
          onChange={(e) => changeVal(e)}
        />
        <button>submit</button>
      </form>
    </Container>
  );
}

export default App;

const Container = styled("div")`
  height: 100vh;

  ${(props) => css`
    background-color: ${props.theme.bgColor};
    color: ${props.theme.textColor};

    button {
      background-color: ${props.theme.btnColor};
      cursor: pointer;
    }
  `}
`;
