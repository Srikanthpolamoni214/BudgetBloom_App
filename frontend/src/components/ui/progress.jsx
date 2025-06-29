import React from "react";

export function Progress({ value = 0, max = 100, label = "", className = "" }) {
  const percentage = Math.min(100, (value / max) * 100).toFixed(1);

  return (
    <div className={`space-y-1 ${className}`}>
      {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right text-xs text-gray-500">{percentage}%</div>
    </div>
  );
}
