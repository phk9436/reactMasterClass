import TodoList from "pages/TodoList";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
