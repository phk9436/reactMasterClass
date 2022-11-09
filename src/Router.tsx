import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinDetail from "./pages/CoinDetail";
import CoinList from "./pages/CoinList";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
