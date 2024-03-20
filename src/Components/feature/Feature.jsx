import React from 'react';
import './feature.css';

export default function Feature({ title, text }) {
  return (
    <div className="gpt3__features-container">
      <div className="gpt3__feature-container">
        <div className="gpt3__feature-title">
          <div />
          <h1>{title}</h1>
        </div>
        <div className="gpt3__feature-text">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
