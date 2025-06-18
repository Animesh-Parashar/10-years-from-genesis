import React from 'react';
import './card.css';

const Card = ({ achievement }) => {
  return (
    <div className="card-wrapper">
      <div className="cardabout">
        <div className="card-inner">
          <div 
            className="card-front" 
            style={{ backgroundImage: `url(${achievement.image})` }}
          >
            <svg viewBox="0 0 24 24">
              {/* Optional: SVG Icon */}
            </svg>
          </div>

          <div className="card-back">
             <div className="scrollable-content">
            <div className="card__content">
              <h3 className="card__title">{achievement.title}</h3>
              <p className="card__subtitle"><strong>Conducted By:</strong> {achievement.conductedby}</p>
              <p className="card__subtitle"><strong>Mode:</strong> {achievement.Mode}</p>
              <p className="card__winner"><strong>Winner:</strong> {achievement.winner}</p>
              <p className="card__description">{achievement.description}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
