import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "utils/api";
import { ImovieData } from "utils/api";
import { makeImgPath } from "utils/utils";

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

function Home() {
  const [movieData, setMovieData] = useState<ImovieData[]>([]);
  const [index, setIndex] = useState(0);
  const { isLoading, data } = useQuery(["movies", "nowPlaying"], getMovies);

  const increaseIdx = () => setIndex((state) => state + 1);

  useEffect(() => {
    data && setMovieData(data.data.results);
  }, [isLoading]);

  const { backdrop_path, title, overview } = movieData[0] || "";

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={backdrop_path && makeImgPath(backdrop_path)}
            onClick={increaseIdx}
          >
            <Title>{title}</Title>
            <Overview>{overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
                transition={{ type: "tween", duration: 1 }}
              >
                {[1, 2, 3, 4, 5, 6].map((e) => (
                  <Box key={e}>{e}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;
