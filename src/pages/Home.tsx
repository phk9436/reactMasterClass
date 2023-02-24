import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect } from "react";

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
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-360, 0, 360]);
  const bg = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.3]);
  useEffect(() => {
    //x.onChange(() => console.log(x.get()));
    //x.onChange(() => console.log(rotate.get()));
    //scrollYProgress.onChange(() => console.log(scrollYProgress.get()));
  }, []);
  return (
    <Wrapper style={{ backgroundImage: bg }}>
      <Box
        variants={boxVariants}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.2}
        dragConstraints={{ left: -100, right: 100 }}
        style={{ x, rotate, scale }}
      ></Box>
      <button onClick={() => x.set(200)}>click</button>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
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
  position: fixed;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
