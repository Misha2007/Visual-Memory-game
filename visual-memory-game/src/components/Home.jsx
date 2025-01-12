// Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeStyle.css";

const Home = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:3001/leaderboard");
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="all">
      <div className="home">
        {/* <h1 className="vmg vmg-3d">Visual Memory Game</h1>
        <div className="btnContainer">
          <Link to="/game">
            <button className="btn">Start Game</button>
          </Link>
        </div> */}
        <div className="innerBackground">
          <span className="material-symbols-outlined icon"></span>
          <h1 className="vmg">FlashMind</h1>
          <u>
            <p className="pps">Tap on the flashed squares</p>
          </u>

          <h2>How to Play</h2>
          <p>1. A sequence of blocks will light up.</p>
          <p>2. Click the blocks in the same order.</p>
          <p>3. Successfully complete levels to increase difficulty.</p>
          <div className="btnContainer">
            <Link to="/game">
              <button className="btn">Start Game</button>
            </Link>
          </div>
          {/* <div id="leaderboard">
            <h3>Leaderboard</h3>
            <ul>
              {leaderboardData.map((entry, index) => (
                <li key={index}>
                  {entry.username} - Level: {entry.level}, Time: {entry.timer}s
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
