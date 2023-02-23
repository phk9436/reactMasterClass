import { motion } from "framer-motion";
import styled from "styled-components";
import { useRef } from "react";

const boxVariants = {
  hover: {
    rotate: 90,
  },
  click: {
    scale: 1,
    borderRadius: "50%",
  },
  drag: {
    backgroundColor: "rgb(46, 204, 113)",
    transition: {
      duration: 0.3,
    },
  },
};

function Home() {
  const boxContainerRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BoxContainer ref={boxContainerRef}>
        <Box
          variants={boxVariants}
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={boxContainerRef}
          whileHover="hover"
          whileDrag="drag"
          whileTap="click"
        ></Box>
      </BoxContainer>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
    width: 400px;
    height: 400px;
    background-color: rgba(255,255,255,0.2);
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
