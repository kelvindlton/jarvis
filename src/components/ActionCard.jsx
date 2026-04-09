import React from 'react';
import { Clock } from 'lucide-react';

export default function ActionCard({
  title,
  description,
  impact,
  impactType,
  time,
  buttonText,
  buttonType,
  imageSrc,
  onClick,
  onButtonClick,
}) {
  return (
    <div
      className="action-card"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <img src={imageSrc} alt={title} className="action-image" />
      <div className="action-content">
        <div className="action-header">
          <div>
            <h4 className="action-title">{title}</h4>
            <p className="action-desc">{description}</p>
          </div>
          <span className={`badge ${impactType}`}>{impact}</span>
        </div>
        <div className="action-footer">
          <button
            className={`btn btn-${buttonType}`}
            onClick={onButtonClick ? (e) => { e.stopPropagation(); onButtonClick(); } : undefined}
          >
            {buttonText}
          </button>
          <div className="action-time">
            <Clock size={12} />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
