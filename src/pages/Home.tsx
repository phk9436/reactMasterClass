import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.5
    }
  },
  hiding: {
    opacity: 0,
    scale: 0,
    y: 10,
  },
};

function Home() {
  const [isShow, setIsShow] = useState(false);
  const changeBox = () => {
    setIsShow((state) => !state);
  };
  return (
    <Wrapper>
      <button onClick={changeBox}>Click</button>
      <AnimatePresence>
        {isShow && (
          <Box
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="hiding"
          />
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
  padding-top: 30vh;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const BoxContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
