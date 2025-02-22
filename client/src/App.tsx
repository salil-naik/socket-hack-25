import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<span>success</span>} />
      <Route path="/failure" element={<span>failure</span>} />
    </Routes>
  );
}

export default App;
