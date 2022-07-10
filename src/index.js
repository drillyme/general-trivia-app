import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Historydeets from "./components/Historydeets";
import Gamepage from "./components/Gamepage";
import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<Home />} />
        <Route path="history" element={<Historydeets />} />
        <Route path="gamepage" element={<Gamepage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  rootElement
);
