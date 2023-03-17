import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { ImovieData } from "utils/api";
import { makeImgPath } from "utils/utils";
import { useNavigate, useMatch } from "react-router-dom";

interface props {
  width: number;
  movieArr: any[];
  toggleLeaving: () => void;
  index: number;
}

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

function Sliders({ width, movieArr, toggleLeaving, index }: props) {
  const navigate = useNavigate();
  const { params } = useMatch("movies/:movieId") ?? {};

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

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const toggleBodyScroll = () => {
    let bodyOverflow = document.body.style;
    params
      ? (bodyOverflow.overflow = "hidden")
      : (bodyOverflow.overflow = "visible");
  };
  toggleBodyScroll();

  const onOverlayClicked = () => {
    navigate("/");
  };

  const modalData =
    movieArr[index] &&
    movieArr[index].find((e: ImovieData) => `${e.id}` === params?.movieId);

  return (
    <>
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
            {movieArr[index] &&
              movieArr[index].map((e: ImovieData) => (
                <Box
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween", duration: 0.3 }}
                  key={e.id}
                  bgphoto={makeImgPath(e.backdrop_path, "w500")}
                  onClick={() => onBoxClicked(e.id)}
                  layoutId={`${e.id}`}
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
      <AnimatePresence>
        {params && (
          <>
            <Overlay
              onClick={onOverlayClicked}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie layoutId={params.movieId}>
              {modalData && (
                <>
                  <CoverImg path={modalData.backdrop_path}>
                    <h2>{modalData.title}</h2>
                  </CoverImg>
                  <OverView>{modalData.overview}</OverView>
                </>
              )}
            </BigMovie>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sliders;

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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: calc(50% - 40vh);
  left: calc(50% - 20vw);
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const CoverImg = styled.div<{ path: string }>`
  height: 400px;
  background: ${(props) =>
    `linear-gradient(to top, #111, transparent), url(${makeImgPath(
      props.path,
      "w500"
    )}) center/cover;`};
  display: flex;
  align-items: flex-end;

  h2 {
    font-size: 36px;
    font-weight: 500;
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
  }
`;

const OverView = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
`;