import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ResultsPage from "./pages/Results";

function App() {
  return (
    <>
      <h1>ResuMate</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </>
  );
}

export default App;