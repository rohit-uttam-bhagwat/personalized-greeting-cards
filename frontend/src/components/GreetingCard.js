import React from 'react';
import { useLocation } from 'react-router-dom';
import './GreetingCard.css';

const GreetingCard = () => {
  const location = useLocation();
  const { message, image } = location.state;

  const shareOnSocialMedia = (platform) => {
    // Implement sharing logic for different platforms
    const shareUrl = window.location.href;
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${message}&url=${shareUrl}`);
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${message} ${shareUrl}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="greeting-card">
      <div className="card-content">
        <img src={image} alt="Greeting" className="card-image" />
        <div className="message">{message}</div>
      </div>
      <div className="sharing-options">
        <button onClick={() => shareOnSocialMedia('facebook')}>Share on Facebook</button>
        <button onClick={() => shareOnSocialMedia('twitter')}>Share on Twitter</button>
        <button onClick={() => shareOnSocialMedia('whatsapp')}>Share on WhatsApp</button>
      </div>
    </div>
  );
};

export default GreetingCard;
