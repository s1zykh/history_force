import { Routes, Route } from "react-router";
import TestPage from "../../pages/testPage/TestPage";
import FirstPage from "../../pages/firstPage/FirstPage";
import { TestsPage } from "../../pages/testsPage/TestPage";
import Result from "../result/Result";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestsPage />} />
        <Route path="/testView" element={<FirstPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
