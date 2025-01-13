import "./Game.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Card from "./Card";

const Rules = () => {
  return (
    <div id="frame" className="rules">
      <div className="innerBackground rules-block">
        <span className="material-symbols-outlined icon"></span>
        <h1 className="vmg rules-3d">How to Play</h1>
        <p className="rule">1. A sequence of blocks will light up.</p>
        <p className="rule">2. Click the blocks in the same order.</p>
        <p className="rule">
          3. Successfully complete levels to increase difficulty.
        </p>
        <div id="buttons">
          <Link to="/">
            <button>
              Home <i className="fa-solid fa-house"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rules;
