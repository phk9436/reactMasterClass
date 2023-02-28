import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

const boxVariants = {
  initial: (custom: boolean) => {
    return {
      opacity: 0,
      scale: 0,
      x: custom ? -100 : 100,
    };
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  hiding: (custom: boolean) => {
    return {
      opacity: 0,
      scale: 0,
      x: custom ? 100 : -100,
      transition: {
        duration: 0.3
      }
    };
  },
};

function Home() {
  const SlideArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  const showNextSlide = () => {
    setBack(false);
    setVisible((state) => (state === 9 ? 0 : state + 1));
  };

  const showPrevSlide = () => {
    setBack(true);
    setVisible((state) => (state === 0 ? 9 : state - 1));
  };

  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter custom={back}>
        {SlideArr.map(
          (e, i) =>
            i === visible && (
              <Box
                key={e}
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="hiding"
                custom={back}
              >
                {e}
              </Box>
            )
        )}
      </AnimatePresence>
      <button onClick={showNextSlide}>next</button>
      <button onClick={showPrevSlide}>prev</button>
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
  position: relative;
  button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border: none;
    outline: none;
    position: absolute;
    bottom: 20%;
    &:nth-of-type(2) {
      bottom: calc(20% + 50px);
    }
  }
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  position: absolute;
`;
