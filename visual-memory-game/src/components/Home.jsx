import React from "react";
import { Link } from "react-router-dom";
import "./HomeStyle.css";

const Home = () => {
  return (
    <div className="all">
      <div className="home">
        <div className="innerBackground">
          <span className="material-symbols-outlined icon"></span>
          <h1>Visual Memory Game</h1>
          <p className="pps">Memorize the Squares</p>
        </div>
      </div>
      <div className="tutorial">
        <h2>How to Play</h2>
        <p>1. A sequence of blocks will light up.</p>
        <p>2. Click the blocks in the same order.</p>
        <p>3. Successfully complete levels to increase difficulty.</p>
      </div>
      <div className="btnContainer">
        <Link to="/game">
          <button className="btn">Start Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
