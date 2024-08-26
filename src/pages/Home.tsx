import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies, ImovieData } from "utils/api";
import { makeImgPath } from "utils/utils";
import useGetWindow from "hooks/useGetWindow";
import Sliders from "components/Sliders";

function Home() {
  const width = useGetWindow();
  const [movieData, setMovieData] = useState<ImovieData[]>([]);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { isLoading, data } = useQuery(["movies", "nowPlaying"], getMovies);
  const movieList = movieData.filter((e, i) => i !== 0 && i !== 19);

  const increaseIdx = () => {
    if (!data || leaving) return;
    setLeaving(true);
    setIndex((state) =>
      state < Math.floor(movieList.length) / 6 - 1 ? state + 1 : 0
    );
  };
  const toggleLeaving = () => setLeaving((state) => !state);

  const sliceMovie = () => {
    if (!movieList) return;
    const movieArr: ImovieData[][] = [];
    const movieArrLength = Math.floor(movieList.length / 6);
    for (let i = 0; i < movieArrLength; i++) movieArr.push([]);
    movieList.forEach((e, i) => {
      const arrLength = Math.floor(i / 6);
      movieArr[arrLength].push(e);
    });
    console.log(movieArr)
    return movieArr;
  };
  const movieArr = sliceMovie() || [];

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
          <Sliders
            width={width}
            movieArr={movieArr}
            toggleLeaving={toggleLeaving}
            index={index}
          />
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
