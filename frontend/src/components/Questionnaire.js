import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Questionnaire.css';

const Questionnaire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const occasion = location.state?.occasion;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'sender',
      question: "What's your name?",
      type: 'text'
    },
    {
      id: 'receiver',
      question: "What's your friend's name?",
      type: 'text'
    },
    {
      id: 'memory',
      question: 'Share a favorite memory with them:',
      type: 'textarea'
    },
    {
      id: 'inside_joke',
      question: 'Any inside jokes you share?',
      type: 'textarea'
    }
  ];

  const handleSubmit = async () => {
    try {
      const UrlGenerateMsg = process.env.REACT_APP_URL_GENERATE_MSG || 'http://localhost:5000'
      const EndpntGenerateMsg = process.env.REACT_APP_ENDPOINT_GENERATE_MSG || '/generate-message';
      const response = await fetch(`${UrlGenerateMsg}${EndpntGenerateMsg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...answers, occasion }),
      });
      const data = await response.json();
      navigate('/greeting', { state: { message: data.message, image: data.image } });
    } catch (error) {
      console.error('Error generating message:', error);
    }
  };

  return (
    <div className="questionnaire-container">
      <h2>Let's create something special for {occasion}</h2>
      <div className="question-card">
        <h3>{questions[currentStep].question}</h3>
        {questions[currentStep].type === 'textarea' ? (
          <textarea
            onChange={(e) => setAnswers({ ...answers, [questions[currentStep].id]: e.target.value })}
            value={answers[questions[currentStep].id] || ''}
          />
        ) : (
          <input
            type="text"
            onChange={(e) => setAnswers({ ...answers, [questions[currentStep].id]: e.target.value })}
            value={answers[questions[currentStep].id] || ''}
          />
        )}
        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button onClick={() => setCurrentStep(currentStep - 1)}>Previous</button>
          )}
          {currentStep < questions.length - 1 ? (
            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
          ) : (
            <button onClick={handleSubmit}>Generate Greeting</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
