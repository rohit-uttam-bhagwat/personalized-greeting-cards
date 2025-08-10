// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/LandingPage.css"; // LandingPage styles
import "./styles/LoadingScreen.css"; // LoadingScreen styles
import "./styles/OccasionSelect.css"; // OccasionSelect styles
import "./styles/GeneratedCard.css"; // GeneratedCard styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);