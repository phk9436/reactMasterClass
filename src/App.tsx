import Router from "./Router";
import GlobalStyle from "./style/GolbalStyle";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

