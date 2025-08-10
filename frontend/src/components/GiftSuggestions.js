// src/components/GiftSuggestions.js
import React from "react";
import "../styles/GiftSuggestions.css";

const GiftSuggestions = ({ suggestions, onSelect }) => {
  return (
    <div className="gift-suggestions">
      <h2>Gift Suggestions</h2>
      <ul>
        {suggestions.map((gift, index) => (
          <li key={index} className="gift-item" onClick={() => onSelect(gift)}>
            <img src={gift.image} alt={gift.name} />
            <div>
              <h3>{gift.name}</h3>
              <p>{gift.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiftSuggestions;