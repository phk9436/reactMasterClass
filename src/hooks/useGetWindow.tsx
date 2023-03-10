import React, { useEffect, useState } from "react";

function useGetWindow() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () =>
      window.addEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  });

  return windowWidth;
}

export default useGetWindow;
