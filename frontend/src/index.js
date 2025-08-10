// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/CreateCard.css";
import "./styles/GeneratedCard.css"; // GeneratedCard styles
import "./styles/GiftSuggestions.css"; // GiftSuggestions styles
import "./styles/Home.css"; // Home styles
import "./styles/LandingPage.css"; 
import "./styles/LoadingScreen.css"; 
import "./styles/OccasionSelect.css"; // OccasionSelect styles
import "./styles/PersonalizationForm.css"; // PersonalizationForm styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);