// src/components/userDashboard/CurrencyToggle.jsx
import React from "react";

const CurrencyToggle = ({ currency, setCurrency }) => {
  const options = ["₹", "$", "€"];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">Currency:</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-white"
      >
        {options.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyToggle;
