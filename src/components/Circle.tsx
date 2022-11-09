import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text }: CircleProps) {
  const [counter, setCounter] = useState(0);
  const addCounter = () => setCounter((state) => state + 1);
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor || "transparent"}
      onClick={addCounter}
    >
      {text ? `${text}Circle ${counter}` : `Circle ${counter}`}
    </Container>
  );
}

export default Circle;

const Container = styled("div")<CircleProps>`
  background-color: ${(props) => props.bgColor};
  border: 3px solid ${(props) => props.borderColor};
  color: #fff;
  width: 200px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
