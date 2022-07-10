import React from "react";
import { Link } from "react-router-dom";

const scoresState = () => {
  const history = localStorage.getItem("history");
  for (let i = 1; i <= history; i++) {
    localStorage.removeItem("score" + i);
  }
  localStorage.removeItem("history");
};

export default function Home() {
  return (
    <div className="navigate">
      <Link to="/history">
        <button className="Homebtns" value="history">
          history
        </button>
      </Link>
      <Link to="/gamepage">
        <button className="Homebtns" value="StartGame">
          startGame
        </button>
      </Link>
      <Link to="/" onClick={scoresState}>
        <button className="Homebtns" value="Logout">
          Logout
        </button>
      </Link>
    </div>
  );
}
