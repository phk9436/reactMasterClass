import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

const overlay = {
  hidden: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  visible: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
};

function Home() {
  const boxArr = [1, 2, 3, 4];
  
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState<null | string>(null);

  const toggle = (data?: string) => {
    data ? setId(data) : setId(null);
    setClicked((state) => !state);
  };
  
  return (
    <Wrapper>
      <Grid>
        {boxArr.map((e, i) => (
          <Box key={i} onClick={() => toggle(`${e}`)} layoutId={`${e}`} />
        ))}
      </Grid>

      <AnimatePresence>
        {id && (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => toggle()}
          >
            <Box layoutId={id} style={{ width: 240 }}/>
          </Overlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 50px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 300px;
  gap: 5px;

  div:where(:first-child, :last-child) {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
