// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCard from "./pages/CreateCard";
import Landing from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateCard />} />
      </Routes>
    </Router>
  );
}
