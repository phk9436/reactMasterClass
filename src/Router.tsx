import Home from "pages/Home";
import Search from "pages/Search";
import Tv from "pages/Tv";
import Header from "components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

