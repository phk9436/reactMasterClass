import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "utils/api";
import { ImovieData } from "utils/api";
import { makeImgPath } from "utils/utils";
import useGetWindow from "hooks/useGetWindow";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const infoVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.2,
    },
  },
};

function Home() {
  const width = useGetWindow();
  const [movieData, setMovieData] = useState<ImovieData[]>([]);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { isLoading, data } = useQuery(["movies", "nowPlaying"], getMovies);
  const movieList = movieData.filter((e, i) => i !== 0 && i !== 19);

  const rowVariants = {
    hidden: {
      x: width - 10,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -width + 10,
    },
  };

  const increaseIdx = () => {
    if (!data || leaving) return;
    setLeaving(true);
    setIndex((state) =>
      state < Math.floor(movieList.length) / 6 - 1 ? state + 1 : 0
    );
  };
  const toggleLeaving = () => setLeaving((state) => !state);

  const sliceMovie = () => {
    if (!data) return;
    const movieArr: any[] = [];
    const movieArrLength = Math.floor(movieList.length / 6);
    for (let i = 0; i < movieArrLength; i++) movieArr.push([]);
    movieList.forEach((e, i) => {
      const arrLength = Math.floor(i / 6);
      movieArr[arrLength].push(e);
    });
    return movieArr;
  };
  const movieArr = sliceMovie();

  useEffect(() => {
    data && setMovieData(data.data.results);
  }, [isLoading]);

  const { backdrop_path, title, overview } = movieData[0] || {};

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
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
                transition={{ type: "tween", duration: 1 }}
              >
                {movieArr &&
                  movieArr[index].map((e: ImovieData) => (
                    <Box
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween", duration: 0.3 }}
                      key={e.id}
                      bgphoto={makeImgPath(e.backdrop_path, "w500")}
                    >
                      <Info
                        key={e.id}
                        variants={infoVariants}
                        transition={{ type: "tween", duration: 0.3 }}
                      >
                        <h4>{e.title}</h4>
                      </Info>
                    </Box>
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
  overflow-x: hidden;
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
  height: 200px;
  position: relative;
  top: -200px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  display: flex;
  align-items: flex-end;

  &:first-child {
    transform-origin: center left;
  }

  &:nth-child(6) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  width: 100%;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
