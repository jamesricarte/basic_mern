import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import EditUsers from "./EditUsers";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditUsers />} />
      </Routes>
    </>
  );
};

export default App;
