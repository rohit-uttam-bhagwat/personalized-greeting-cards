import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Heartfelt Greetings</h1>
      <p>Create beautifully personalized messages for your loved ones</p>
      <div className="occasion-selection">
        <h2>Select an Occasion</h2>
        <div className="occasion-grid">
          {['Birthday', 'Anniversary', 'Friendship Day', 'Custom'].map((occasion) => (
            <button
              key={occasion}
              className="occasion-button"
              onClick={() => navigate('/questionnaire', { state: { occasion } })}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
