import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Success } from "./components/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failure" element={<span>failure</span>} />
    </Routes>
  );
}

export default App;
