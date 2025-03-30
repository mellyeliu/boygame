import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import HeadToHead from "./Pages/HeadToHead";
import WaitingRoom from "./Pages/WaitingRoom"; // <-- create this
import "./theme.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/waiting/:roomCode" element={<WaitingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
