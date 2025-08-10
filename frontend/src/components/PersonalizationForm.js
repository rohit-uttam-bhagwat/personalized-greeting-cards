// src/components/PersonalizationForm.js
import React, { useState } from "react";
import "../styles/PersonalizationForm.css";

const PersonalizationForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("friendly");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, message, tone });
  };

  return (
    <form className="personalization-form" onSubmit={handleSubmit}>
      <h2>Personalize Your Card</h2>
      <label>
        Recipient's Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </label>
      <label>
        Custom Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a heartfelt message..."
        />
      </label>
      <label>
        Tone:
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="friendly">Friendly</option>
          <option value="romantic">Romantic</option>
          <option value="funny">Funny</option>
          <option value="formal">Formal</option>
        </select>
      </label>
      <button type="submit">Generate Card</button>
    </form>
  );
};

export default PersonalizationForm;