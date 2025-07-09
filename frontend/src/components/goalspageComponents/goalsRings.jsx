
// ProgressRings.jsx
import React from 'react';

const ProgressRings = ({ saved, amount }) => {
  const percent = Math.min((saved / amount) * 100, 100);
  const color = percent >= 75 ? 'stroke-green-500' : percent >= 40 ? 'stroke-yellow-500' : 'stroke-red-500';

  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#eee" strokeWidth="10" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        strokeWidth="10"
        className={color}
        strokeDasharray={`${percent * 2.83} 283`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="55" textAnchor="middle" fontSize="16" fill="#333">{Math.floor(percent)}%</text>
    </svg>
  );
};

export default ProgressRings;