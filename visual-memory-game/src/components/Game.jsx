import "./Game.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Card from "./Card";

const Game = () => {
  const [level, setLevel] = useState(2);
  const [hearts, setHearts] = useState([true, true, true]);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // Generate random cards based on the level
  const generateRandomCards = (level) => {
    const numCards = 16 + Math.floor(level / 4) * 4;
    let card_array = [];
    let counter = 0;

    for (let i = 0; i < numCards; i++) {
      let random_number = Math.random() < 0.5;
      if (counter < level && random_number) {
        card_array.push(random_number);
        counter += 1;
      } else {
        card_array.push(false);
      }
    }
    return card_array;
  };

  const [activeStates, setActiveStates] = useState(generateRandomCards(level));

  const handleReset = () => {
    setActiveStates(generateRandomCards(level));
    setHearts([true, true, true]);
    setTimer(0);
    setIsGameRunning(true);
    setIsGameOver(false);
    setLevel;
  };

  const handleCardClick = (isActive, index) => {
    if (isActive) {
      setActiveStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        if (newStates.every((card) => !card)) {
          setLevel((prevLevel) => prevLevel + 1);
          setTimeout(
            () => setActiveStates(generateRandomCards(level + 1)),
            100
          );
          handleReset();
        }
        return newStates;
      });
    } else {
      setHearts((prevHearts) => {
        const newHearts = [...prevHearts];
        const firstActiveIndex = newHearts.indexOf(true);
        if (firstActiveIndex !== -1) {
          newHearts[firstActiveIndex] = false;
        }
        if (newHearts.every((heart) => !heart)) {
          setIsGameRunning(false);
          setIsGameOver(true);
          setLevel(2);
          setTimer(0);
        }
        return newHearts;
      });
    }
  };

  useEffect(() => {
    if (isGameRunning && !intervalId) {
      const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
      setIntervalId(id);
    }
    if (!isGameRunning && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [isGameRunning, intervalId]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:3001/leaderboard");
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const saveLeaderboardData = async (data) => {
    try {
      await fetch("http://localhost:3001/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error saving leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  const handleGameOver = () => {
    if (username.trim() === "") {
      alert("Please enter a username.");
      return;
    }

    const newEntry = { username, level, timer };
    const updatedLeaderboard = [...leaderboardData, newEntry];

    setLeaderboardData(updatedLeaderboard);
    saveLeaderboardData(newEntry);

    handleReset();
  };

  return (
    <div id="frame">
      <div id="main-container">
        <div id="game-area">
          <div id="headings">
            <h2 className="Level">Level {level - 1}</h2>
            <h2>
              {hearts.map((isActive, index) =>
                isActive ? (
                  <FaHeart key={index} className="heart" />
                ) : (
                  <CiHeart key={index} className="heart inactive" />
                )
              )}
            </h2>
            <h3>Timer: {timer}s</h3>
          </div>
          <div id="container">
            {activeStates.map((isActive, index) => (
              <Card
                key={index}
                active={isActive && "active"}
                onClick={() => handleCardClick(isActive, index)}
              />
            ))}
          </div>
          <div id="buttons">
            <button onClick={handleReset}>
              Restart <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <Link to="/">
              <button>
                Home <i className="fa-solid fa-house"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div id="second_column">
        <div id="leaderboard">
          <h3>Leaderboard</h3>
          <ul>
            {leaderboardData.map((entry, index) => (
              <li key={index}>
                {entry.username} - Level: {entry.level}, Time: {entry.timer}s
              </li>
            ))}
          </ul>
        </div>
        {isGameOver && (
          <div id="game-over-modal">
            <h2>Game Over</h2>
            <p>Enter your username to save your score:</p>
            <div id="username-input">
              <input
                type="text"
                placeholder="User-001"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleGameOver}>Submit</button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Game;
