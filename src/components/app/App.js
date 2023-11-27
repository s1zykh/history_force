import { Routes, Route } from "react-router";
import TestPage from "../../pages/testPage/TestPage";
import FirstPage from "../../pages/firstPage/FirstPage";
import Result from "../result/Result";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
