import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Historydeets() {
  const history = localStorage.getItem("history");
  const scores = [];

  for (let i = 1; i <= history; i++) {
    scores.push(localStorage.getItem("score" + i));
  }
  // console.log(localStorage.getItem())
  return (
    <div className="container1">
      <div>check previous scores</div>
      {scores.map((score, index) => (
        <li className="button playcard">
          {index + 1}.) score:{score}
        </li>
      ))}
      <Link to="/home" className="button card link">
        Home
      </Link>
    </div>
  );
}
