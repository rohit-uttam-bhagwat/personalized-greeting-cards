import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Questionnaire from './components/Questionnaire';
import GreetingCard from './components/GreetingCard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/greeting" element={<GreetingCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
