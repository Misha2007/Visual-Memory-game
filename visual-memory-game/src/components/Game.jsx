import "./Game.css";
import { Link } from "react-router-dom";

const Game = () => {
  return (
    <div id="frame">
      <div id="main-container">
        <div id="headings">
          <h2>Level 1</h2>
          <h2>
            Lives <i className={"fa-solid fa-heart"}></i>
            <i className="fa-solid fa-heart"></i>
            <i className="fa-regular fa-heart"></i>
          </h2>
        </div>
        <div id="container">
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block"}></div>
          <div className={"block active"}></div>
        </div>
        <div id="buttons">
          <button>
            Start again <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
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

export default Game;
