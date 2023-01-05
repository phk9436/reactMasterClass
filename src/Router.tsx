import TodoList from "pages/TodoList";
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
