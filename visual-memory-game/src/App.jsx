import React from "react";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <a href="/">Rules</a>
          <a href="/leaderboard">Leader Board</a>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
